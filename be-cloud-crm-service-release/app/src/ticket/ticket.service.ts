import { Injectable } from '@nestjs/common';
import {
  Prisma,
  RecipientType,
  Ticket,
  TicketAgentAssignment,
  TicketMessage,
  TicketMode,
  TicketStatus,
} from '@prisma/client';
import BulkUpdateTicketRequestDto from 'src/agent/dto/bulk.update.ticket.request.dto';
import OffsetPagination from '../utils/pagination/offset.pagination';
import { ActiveTicketPaginatedList } from './models/active.ticket.paginated.list';
import { AgentTicketPaginatedList } from './models/agent.ticket.paginated.list';
import InactiveTicketPaginatedList from './models/inactive.ticket.paginated.list';
import { UnreadTicketPaginatedList } from './models/unread.tickets.pagination.model';
import { TicketRepository } from './repository/ticket.repository';
import { TicketTag } from '../constants/enums/ticket.tags.enum';
import { PaginatedTicketPayload } from './interfaces/paginated.ticket.payload';
import * as moment from 'moment';

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) {}

  getActiveTicketByNumber(number: string): Promise<Ticket> {
    return this.ticketRepository.getLastTicketByNumberByStatuses(number, [
      TicketStatus.PENDING,
      TicketStatus.UNREAD,
      TicketStatus.OPEN,
    ]);
  }

  getTicket(ticketID: string): Promise<Ticket> {
    return this.ticketRepository.getTicket(ticketID);
  }

  getTicketMessage(ticketMessageID: string): Promise<TicketMessage> {
    return this.ticketRepository.getTicketMessage(ticketMessageID);
  }

  async initializeTicket(ticket: Prisma.TicketCreateInput): Promise<Ticket> {
    try {
      return await this.getActiveTicketByNumber(ticket.number);
    } catch (err) {
      return this.ticketRepository.createTicket(ticket);
    }
  }

  createTicket(ticket: Prisma.TicketCreateInput): Promise<Ticket> {
    return this.ticketRepository.createTicket(ticket);
  }

  createTicketMessage(
    ticketMessage: Prisma.TicketMessageUncheckedCreateInput,
  ): Promise<TicketMessage> {
    return this.ticketRepository.createTicketMessage(ticketMessage);
  }

  updateTicket(
    updateCriteria: Prisma.TicketWhereUniqueInput,
    data: Prisma.TicketUpdateWithoutMessagesInput,
  ): Promise<Ticket> {
    return this.ticketRepository.updateTicket(updateCriteria, data);
  }

  listAgentTicketsByIncludedStatus(
    statuses: TicketStatus[],
  ): Promise<Ticket[]> {
    return this.ticketRepository.listTicketsByIncludedStatusesByMode(
      statuses,
      TicketMode.AGENT,
    );
  }

  listChatBotTicketsByIncludedStatus(
    statuses: TicketStatus[],
  ): Promise<Ticket[]> {
    return this.ticketRepository.listTicketsByIncludedStatusesByMode(
      statuses,
      TicketMode.AGENT,
    );
  }

  checkTicketAgentAssignment(ticketID: string, agentID: string) {
    return this.ticketRepository.getTicketAgentAssignment(ticketID, agentID);
  }

  async assignTicketToAgent(
    data: Prisma.TicketAgentAssignmentUncheckedCreateInput,
  ): Promise<TicketAgentAssignment> {
    await this.updateTicket(
      { id: data.ticketID },
      {
        agentID: data.agentID,
        agentEmail: data.agentEmail,
        mode: TicketMode.AGENT,
      },
    );
    return this.ticketRepository.createTicketAgentAssignment(data);
  }

  listTicketsByIDs(ticketIDs: string[]): Promise<Ticket[]> {
    const searchCriteria: Prisma.TicketWhereInput = {
      id: {
        in: ticketIDs,
      },
    };
    return this.ticketRepository.listTicketsWithCriteria(
      searchCriteria,
      0,
      ticketIDs.length,
    );
  }

  listPaginatedInactiveTicket(
    request: InactiveTicketPaginatedList,
  ): Promise<OffsetPagination<Ticket>> {
    const { pageSize, pageNumber, search } = request;
    const searchCriteria: Prisma.TicketWhereInput = {
      status: {
        in: [TicketStatus.CLOSED, TicketStatus.SOLVED],
      },
      number: {
        contains: search,
      },
    };

    return this.listAnyPaginatedTicket({
      searchCriteria,
      pageNumber,
      pageSize,
    });
  }

  listPaginatedOTPTicket(
    request: ActiveTicketPaginatedList,
  ): Promise<OffsetPagination<Ticket>> {
    const { pageSize, pageNumber, statuses, search } = request;
    const searchCriteria: Prisma.TicketWhereInput = {
      status: {
        in: statuses,
      },
      number: {
        contains: search,
      },
      tags: {
        array_contains: TicketTag.OTP_ISSUE,
      },
    };

    return this.listAnyPaginatedTicket({
      searchCriteria,
      pageNumber,
      pageSize,
    });
  }

  listPaginatedActiveTicket(
    request: ActiveTicketPaginatedList,
  ): Promise<OffsetPagination<Ticket>> {
    const { pageSize, pageNumber, statuses, search } = request;
    const searchCriteria: Prisma.TicketWhereInput = {
      status: {
        in: statuses,
      },
      number: {
        contains: search,
      },
      OR: [
        {
          NOT: {
            tags: {
              array_contains: TicketTag.OTP_ISSUE,
            },
          },
        },
        {
          tags: {
            equals: Prisma.AnyNull,
          },
        },
      ],
    };

    return this.listAnyPaginatedTicket({
      searchCriteria,
      pageNumber,
      pageSize,
    });
  }

  listPaginatedUnreadTicket(
    request: UnreadTicketPaginatedList,
  ): Promise<OffsetPagination<Ticket>> {
    const { pageSize, pageNumber, search } = request;
    const searchCriteria: Prisma.TicketWhereInput = {
      status: TicketStatus.UNREAD,
      mode: TicketMode.AGENT,
      ticketAgentAssignment: {
        none: {},
      },
      number: {
        contains: search,
      },
      OR: [
        {
          NOT: {
            tags: {
              array_contains: TicketTag.OTP_ISSUE,
            },
          },
        },
        {
          tags: {
            equals: Prisma.AnyNull,
          },
        },
      ],
    };

    return this.listAnyPaginatedTicket({
      searchCriteria,
      pageNumber,
      pageSize,
    });
  }

  listPaginatedAgentTickets(
    request: AgentTicketPaginatedList,
  ): Promise<OffsetPagination<Ticket>> {
    const { pageSize, pageNumber, search, statuses, agentID } = request;
    const searchCriteria: Prisma.TicketWhereInput = {
      status: {
        in: statuses,
      },
      number: {
        contains: search,
      },
      agentID,
    };

    return this.listAnyPaginatedTicket({
      searchCriteria,
      pageNumber,
      pageSize,
    });
  }

  listTicketMessageByTicket(ticketID: string) {
    return this.ticketRepository.listTicketMessageByTicket(ticketID);
  }

  bulkAgentTicketAssignment(request: {
    ticketID: string[];
    agentID: string;
    agentEmail: string;
  }) {
    const agentAssignmentRequests: Prisma.TicketAgentAssignmentCreateManyInput[] =
      request.ticketID.map((row) => {
        return {
          ticketID: row,
          agentID: request.agentID,
          agentEmail: request.agentEmail,
        };
      });

    return this.ticketRepository.bulkCreateTicketAgentAssignment(
      agentAssignmentRequests,
    );
  }

  listInActiveTicketsByNumber(number: string) {
    return this.ticketRepository.listAllTickets({
      number,
      status: {
        in: [TicketStatus.CLOSED, TicketStatus.SOLVED],
      },
    });
  }

  async routeTicketsToAgentAfter1HourOfIdling() {
    const _1hBack = moment().subtract(1, 'h');

    const tickets = await this.ticketRepository.listAllTickets({
      status: {
        notIn: [TicketStatus.CLOSED, TicketStatus.SOLVED],
      },
      mode: TicketMode.CHAT_BOT,
      lastMessageAt: {
        lte: _1hBack.toDate(),
      },
    });

    if (!tickets.length) {
      return [];
    }

    const rows = await this.ticketRepository.bulkUpdateTicket({
      data: {
        mode: TicketMode.AGENT,
        isRead: false,
      },
      where: {
        id: {
          in: tickets.map((ticket) => ticket.id),
        },
      },
    });

    console.log('Rows updated', rows.count);

    return tickets;
  }
  async closeTicketsAfter24HoursOfLastMessage() {
    const _24hBack = moment().subtract(24, 'h');

    const tickets = await this.ticketRepository.listAllTickets({
      status: {
        notIn: [TicketStatus.CLOSED, TicketStatus.SOLVED],
      },
      lastMessageAt: {
        lte: _24hBack.toDate(),
      },
    });

    if (!tickets.length) {
      return [];
    }

    const rows = await this.ticketRepository.bulkUpdateTicket({
      data: {
        status: TicketStatus.CLOSED,
      },
      where: {
        id: {
          in: tickets.map((ticket) => ticket.id),
        },
      },
    });

    console.log('Rows updated', rows.count);

    return tickets;
  }
  async solveOTPMessageUnAssignedTicketsAfterHalfHour() {
    const _30mBack = moment().subtract(30, 'm');

    const tickets = await this.ticketRepository.listAllTickets({
      status: {
        notIn: [TicketStatus.CLOSED, TicketStatus.SOLVED],
      },
      agentEmail: null,
      tags: {
        array_contains: TicketTag.OTP_SENT,
      },
      createdAt: {
        lte: _30mBack.toDate(),
      },
    });

    if (!tickets.length) {
      return [];
    }

    const rows = await this.ticketRepository.bulkUpdateTicket({
      data: {
        status: TicketStatus.SOLVED,
      },
      where: {
        id: {
          in: tickets.map((ticket) => ticket.id),
        },
      },
    });

    console.log('Rows updated', rows.count);

    return tickets;
  }
  async closeTicketsAfter24HoursUserMessage() {
    const now = moment();
    now.subtract(24, 'h');

    const tickets = await this.ticketRepository.listAllTickets({
      status: {
        notIn: [TicketStatus.CLOSED, TicketStatus.SOLVED],
      },
      messages: {
        none: {
          recipientType: RecipientType.USER,
          createdAt: {
            gt: now.toDate(),
          },
        },
      },
    });

    if (!tickets.length) {
      return [];
    }

    const rows = await this.ticketRepository.bulkUpdateTicket({
      data: {
        status: TicketStatus.CLOSED,
      },
      where: {
        id: {
          in: tickets.map((ticket) => ticket.id),
        },
      },
    });

    console.log('Rows updated', rows.count);

    return tickets;
  }

  bulkUpdateTicket(request: BulkUpdateTicketRequestDto) {
    const { IDs, data: ticket } = request;

    const bulkUpdateQuery: Prisma.TicketUpdateManyArgs = {
      where: {
        id: {
          in: IDs,
        },
      },
      data: ticket,
    };

    return this.ticketRepository.bulkUpdateTicket(bulkUpdateQuery);
  }

  private async listAnyPaginatedTicket(payload: PaginatedTicketPayload) {
    const { searchCriteria, pageSize, pageNumber } = payload;
    try {
      const count = await this.ticketRepository.getTicketCountWithCriteria(
        searchCriteria,
      );

      if (count === 0) {
        return new OffsetPagination<Ticket>({
          count: 0,
          pageSize,
          items: [],
          pageNumber,
        });
      }

      const items = await this.ticketRepository.listTicketsWithCriteria(
        searchCriteria,
        pageSize * (pageNumber - 1),
        pageSize,
      );

      return new OffsetPagination<Ticket>({
        count,
        pageSize,
        items,
        pageNumber,
      });
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
}
