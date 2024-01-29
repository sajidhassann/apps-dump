import { Injectable, Logger } from '@nestjs/common';
import { TicketService } from '../ticket/ticket.service';
import { WebsocketGateway } from '../websocket.gateway';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);
  constructor(
    private readonly ticketService: TicketService,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async closeTickets() {
    const tickets =
      await this.ticketService.closeTicketsAfter24HoursOfLastMessage();

    this.logger.log(
      `Tickets archived ${tickets.length}`,
      `Tickets archived ${JSON.stringify(tickets)}`,
    );

    if (!tickets.length) {
      return;
    }

    tickets.map((ticket) => this.websocketGateway.emitUpdatedTicket(ticket));
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async solveOTPTickets() {
    const tickets =
      await this.ticketService.solveOTPMessageUnAssignedTicketsAfterHalfHour();

    this.logger.log(
      `OTP Tickets solved ${tickets.length}`,
      `OTP Tickets solved ${JSON.stringify(tickets)}`,
    );

    if (!tickets.length) {
      return;
    }

    tickets.map((ticket) => this.websocketGateway.emitUpdatedTicket(ticket));
  }

  // @Cron(CronExpression.EVERY_10_MINUTES)
  // async routeTicketsToAgent() {
  //   const tickets =
  //     await this.ticketService.routeTicketsToAgentAfter1HourOfIdling();
  //
  //   this.logger.log(
  //     `Tickets routed to agent ${tickets.length}`,
  //     `Tickets routed to agent ${JSON.stringify(tickets)}`,
  //   );
  //
  //   if (!tickets.length) {
  //     return;
  //   }
  //
  //   tickets.map((ticket) =>
  //     this.websocketGateway.emitUpdatedTicketMessage(ticket),
  //   );
  // }
}
