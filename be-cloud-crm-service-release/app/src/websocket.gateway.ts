import { forwardRef, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GatewayMetadata,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Ticket, TicketMessage, TicketStatus } from '@prisma/client';
import { Server } from 'socket.io';
import { CohortService } from './cohort/cohort.service';
import { ConfigKeys } from './config/app.configuration';
import { CallStatus } from './constants/enums/call.status.enum';
import { SocketEvent } from './constants/enums/socket.event.enum';
import { ArchiveTicketDto } from './models/archive.ticket.dto';
import { AssignTicketDto } from './models/assign.ticket.dto';
import { SendAgentMessageDto } from './models/send.agent.message.dto';
import { TicketService } from './ticket/ticket.service';
import { WhatsappService } from './whatsapp/whatsapp.service';

// TODO: Add origins for cors
@WebSocketGateway<GatewayMetadata>({
  connectTimeout: 100000,
  maxHttpBufferSize: 1e8,
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://saarif.maqsad.net',
      'https://dev.saarif.maqsad.net',
    ],
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  readonly whatsAppBearerToken: string;
  readonly whatsAppApiUrl: string;

  constructor(
    private readonly cohortService: CohortService,
    private readonly ticketService: TicketService,
    @Inject(forwardRef(() => WhatsappService))
    private readonly whatsappService: WhatsappService,
    private readonly config: ConfigService,
  ) {
    this.whatsAppBearerToken =
      this.config.get<string>(ConfigKeys.WHATSAPP_BEARER_TOKEN) ?? '';
    this.whatsAppApiUrl =
      this.config.get<string>(ConfigKeys.WHATSAPP_API_URL) ?? '';
  }

  placeCall(number: string) {
    console.log('sending message');
    console.log('Inside Place Call');
    this.server.emit('call', { number: number });
  }

  getActiveCallByAgent(agentEmail: string) {
    console.log('sending message');
    this.server.emit('get-active-call', agentEmail);
  }

  cancelCall() {
    console.log('sending message');
    console.log('Canceling Call');
    this.server.emit('cancel-call', 'cancel');
  }

  @SubscribeMessage('new message')
  handleEvent(@MessageBody() data: string): string {
    console.log('Inside new message', data);
    return data;
  }

  @SubscribeMessage('place_call')
  async handlePlaceCallEvent(@MessageBody() data: any): Promise<any> {
    console.log('Inside Place Call', data);
    this.server.emit(data, 'Emitting Data');
    await this.cohortService.updateCohortCallStatus({
      agent: data?.email,
      callID: data?.callID,
      status: CallStatus.PENDING,
    });
    await this.cohortService.createCohortCallLog({
      cohortCallID: data?.callID,
      agentID: data?.email,
    });
    this.server.emit('update_client', data);
    this.server.emit(`${data?.email}_start-call`, data); // @ANDROID APP
    return data;
  }

  @SubscribeMessage('call-connected') // @ANDROID APP
  async handleConnectedCallEvent(@MessageBody() data: any): Promise<any> {
    console.log('Inside Connected Call');
    console.log('INSIDE CONNECTED CALL JSON', JSON.stringify(data));
    await this.cohortService.updateCohortCallStatus({
      callID: data[0],
      status: CallStatus.CONNECTED,
    });
    this.server.emit(`${data?.[1]}_call-connected`, { callID: data[0] });
    return data;
  }

  @SubscribeMessage('call-disconnected') // @ANDROID APP
  async handleDisconnectedCallEvent(@MessageBody() data: any): Promise<any> {
    console.log('Inside Disconnected Call');
    console.log('INSIDE DISCONNECTED CALL JSON', JSON.stringify(data));
    await this.cohortService.updateCohortCallStatus({
      callID: data[0],
      status: CallStatus.COMPLETED,
    });
    this.server.emit(`${data?.[1]}_call-disconnected`, { callID: data[0] });
    return data;
  }

  @SubscribeMessage(SocketEvent.ASSIGN_TICKET)
  async assignTicket(@MessageBody() data: AssignTicketDto) {
    console.log('Inside Assign Ticket', JSON.stringify(data));
    const { ticketIDs, agentID, agentEmail } = data;

    await Promise.all(
      ticketIDs.map((ticketID) =>
        this.ticketService.assignTicketToAgent({
          ticketID,
          agentEmail,
          agentID,
        }),
      ),
    );

    const tickets = await this.ticketService.listTicketsByIDs(data.ticketIDs);
    tickets.map((ticket) => this.emitUpdatedTicket(ticket));
  }

  @SubscribeMessage(SocketEvent.ARCHIVE_TICKET)
  async archiveTicket(@MessageBody() data: ArchiveTicketDto) {
    console.log('Inside Assign Ticket', JSON.stringify(data));
    const { ticketIDs } = data;

    const tickets = await Promise.all(
      ticketIDs.map((ticketID) =>
        this.ticketService.updateTicket(
          { id: ticketID },
          { status: TicketStatus.CLOSED },
        ),
      ),
    );

    tickets.map((ticket) => this.emitUpdatedTicket(ticket));
  }

  emitChatMessage(message: TicketMessage) {
    console.log(
      'Inside Send Chat Message FOR WEBSOCKETS >> ',
      JSON.stringify(message),
    );
    this.server.emit(message.ticketID, message);
  }

  emitUpdatedTicket(ticket: Ticket) {
    console.log('Emitting updated ticket to client', JSON.stringify(ticket));
    this.server.emit(SocketEvent.UPDATE_TICKET, ticket);
  }

  emitUpdatedTicketMessage(ticket: Ticket) {
    console.log('Emitting updated ticket to client', JSON.stringify(ticket));
    this.server.emit(SocketEvent.UPDATE_TICKET_MESSAGE, ticket);
  }

  @SubscribeMessage(SocketEvent.SEND_AGENT_MESSAGE)
  async sendAgentMessage(@MessageBody() data: SendAgentMessageDto) {
    console.log('Inside Send Agent Message', JSON.stringify(data));

    let ticket = await this.ticketService.getTicket(data.ticketID);

    if (
      !(ticket.agentEmail && ticket.agentID) ||
      ticket.agentEmail !== data.agentEmail
    ) {
      return;
    }

    ticket = await this.ticketService.updateTicket(
      { id: ticket.id },
      { isRead: true, lastMessageAt: new Date() },
    );

    this.emitUpdatedTicketMessage(ticket);
    const ticketMessage = await this.whatsappService.sendAgentMessage(
      ticket,
      data,
    );
    this.emitChatMessage(ticketMessage);
  }

  handleConnection(client: any, ...args: any[]): any {
    console.log('Connection', client?.id);
  }

  handleDisconnect(client: any): any {
    console.log('Disconnected :(', client?.id);
    this.server.disconnectSockets(true);
  }
}
