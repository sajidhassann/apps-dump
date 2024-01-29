import { Injectable } from '@nestjs/common';
import { TicketService } from 'src/ticket/ticket.service';
import { CohortService } from '../cohort/cohort.service';
import { UpdateCohortCallRequestDto } from './dto/update.cohort.call.request.dto';

import { CallStatus, Role, TicketStatus } from '@prisma/client';
import { AgentTicketPaginatedList } from '../ticket/models/agent.ticket.paginated.list';
import { ActiveTicketPaginatedList } from '../ticket/models/active.ticket.paginated.list';
import { UnreadTicketPaginatedList } from '../ticket/models/unread.tickets.pagination.model';
import { WebsocketGateway } from '../websocket.gateway';
import { ActiveTicketsQuery } from './dto/active.tickets.query.request';
import BulkUpdateTicketRequestDto from './dto/bulk.update.ticket.request.dto';
import { UpdateTicketRequestDto } from './dto/update.ticket.request.dto';
import { UnreadTicketsQuery } from './dto/unread.tickets.query.request';
import { AgentTicketsQuery } from './dto/agent.tickets.query.request';
import { InactiveTicketsQuery } from './dto/inactive.tickets.query.request';
import InactiveTicketPaginatedList from '../ticket/models/inactive.ticket.paginated.list';
import { PrismaService } from '../database/prisma.service';
import { IAgent } from './interfaces/agent.interface';
import ListPaginatedCohortCall from 'src/cohort/models/list.paginated.cohort.call';
import { CohortCallRequestQuery } from 'src/cohort/dto/cohort.call.request.dto';
import { CreateCohortCallRequestDto } from 'src/admin/dto/create.cohort.call.request.dto';

@Injectable()
export class AgentService {
  constructor(
    private readonly cohortService: CohortService,
    private readonly ticketService: TicketService,
    private readonly websocketGateway: WebsocketGateway,
    private readonly prisma: PrismaService,
  ) {}

  listCohorts() {
    return this.cohortService.listActiveCohorts();
  }

  getCohortCalls(query: CohortCallRequestQuery) {
    return this.cohortService.listPaginatedCohortCall(
      new ListPaginatedCohortCall(query),
    );
  }

  updateCohortCall(id: string, body: UpdateCohortCallRequestDto) {
    return this.cohortService.updateCohortCall({ id: id }, body);
  }

  createCohortCall(body: CreateCohortCallRequestDto) {
    return this.cohortService.createCohortCall(body);
  }

  listUnreadTickets() {
    return this.ticketService.listChatBotTicketsByIncludedStatus([
      TicketStatus.UNREAD,
    ]);
  }

  listInActiveTicketsByNumber(number: string) {
    return this.ticketService.listInActiveTicketsByNumber(number);
  }

  listReadTickets() {
    return this.ticketService.listAgentTicketsByIncludedStatus([
      TicketStatus.PENDING,
      TicketStatus.OPEN,
    ]);
  }

  getTicketMessageHistory(ticketID: string) {
    return this.ticketService.listTicketMessageByTicket(ticketID);
  }

  async updateTicket(data: UpdateTicketRequestDto) {
    const ticket = await this.ticketService.updateTicket({ id: data.id }, data);
    this.websocketGateway.emitUpdatedTicket(ticket);
    return ticket;
  }

  listPaginatedActiveTickets(query: ActiveTicketsQuery) {
    return this.ticketService.listPaginatedActiveTicket(
      new ActiveTicketPaginatedList(query),
    );
  }

  listPaginatedOTPTickets(query: ActiveTicketsQuery) {
    return this.ticketService.listPaginatedOTPTicket(
      new ActiveTicketPaginatedList(query),
    );
  }

  listPaginatedInactiveTickets(query: InactiveTicketsQuery) {
    return this.ticketService.listPaginatedInactiveTicket(
      new InactiveTicketPaginatedList(query),
    );
  }

  listPaginatedUnreadTickets(query: UnreadTicketsQuery) {
    return this.ticketService.listPaginatedUnreadTicket(
      new UnreadTicketPaginatedList(query),
    );
  }

  listPaginatedAgentTickets(query: AgentTicketsQuery & { agentID: string }) {
    return this.ticketService.listPaginatedAgentTickets(
      new AgentTicketPaginatedList(query),
    );
  }

  bulkAgentTicketAssignment(request: {
    ticketID: string[];
    agentID: string;
    agentEmail: string;
  }) {
    // return this.ticketService.bulkAgentTicketAssignment(request);
  }

  async createAgent(data: IAgent) {
    try {
      return await this.prisma.agent.findUniqueOrThrow({
        where: { id: data.id },
      });
    } catch (err) {
      return this.prisma.agent.create({
        data: {
          id: data.id,
          email: data.email,
          fName: data.fName,
          lName: data.lName,
          role: Role.AGENT_CX,
        },
      });
    }
  }

  listAgent() {
    return this.prisma.agent.findMany();
  }

  bulkUpdateTicket(body: BulkUpdateTicketRequestDto) {
    return this.ticketService.bulkUpdateTicket(body);
  }
}
