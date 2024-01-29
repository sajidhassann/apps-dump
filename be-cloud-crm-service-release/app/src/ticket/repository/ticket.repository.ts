import { Injectable } from '@nestjs/common';
import {
  Prisma,
  Ticket,
  TicketAgentAssignment,
  TicketMessage,
  TicketMode,
  TicketStatus,
} from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class TicketRepository {
  constructor(private prisma: PrismaService) {}

  listTicketsByIncludedStatusesByMode(
    statuses: TicketStatus[],
    mode: TicketMode,
  ): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      where: {
        mode: mode,
        status: {
          in: statuses,
        },
      },
      orderBy: {
        status: 'desc',
      },
    });
  }

  getLastTicketByNumberByStatuses(
    number: string,
    statuses: TicketStatus[],
  ): Promise<Ticket> {
    return this.prisma.ticket.findFirstOrThrow({
      where: {
        number,
        status: {
          in: statuses,
        },
      },
      include: {
        ticketAgentAssignment: {
          select: { id: true, agentEmail: true },
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  createTicket(data: Prisma.TicketCreateInput): Promise<Ticket> {
    return this.prisma.ticket.create({ data });
  }

  getTicket(id: string): Promise<Ticket> {
    return this.prisma.ticket.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        ticketAgentAssignment: {
          select: { id: true, agentEmail: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  updateTicket(
    updateCriteria: Prisma.TicketWhereUniqueInput,
    data: Prisma.TicketUpdateWithoutMessagesInput,
  ): Promise<Ticket> {
    return this.prisma.ticket.update({
      where: updateCriteria,
      data,
      include: {
        ticketAgentAssignment: {
          select: { id: true, agentEmail: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  createTicketMessage(
    data: Prisma.TicketMessageUncheckedCreateInput,
  ): Promise<TicketMessage> {
    return this.prisma.ticketMessage.create({ data });
  }

  getTicketMessage(id: string): Promise<TicketMessage> {
    return this.prisma.ticketMessage.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  createTicketAgentAssignment(
    data: Prisma.TicketAgentAssignmentUncheckedCreateInput,
  ): Promise<TicketAgentAssignment> {
    return this.prisma.ticketAgentAssignment.create({ data });
  }

  getTicketAgentAssignment(
    ticketID: string,
    agentID: string,
  ): Promise<TicketAgentAssignment> {
    return this.prisma.ticketAgentAssignment.findFirstOrThrow({
      where: {
        ticketID,
        agentID,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // TODO: Apply pagination & sorting
  listTicketMessageByTicket(ticketID: string): Promise<TicketMessage[]> {
    return this.prisma.ticketMessage.findMany({
      where: {
        ticketID,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  listTicketByStatusByMode(
    status: TicketStatus,
    mode: TicketMode,
  ): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      where: { status, mode },
      orderBy: { updatedAt: 'desc' },
    });
  }

  getTicketCountWithCriteria(criteria: Prisma.TicketWhereInput = {}) {
    return this.prisma.ticket.count({ where: criteria });
  }

  listAllTickets(criteria: Prisma.TicketWhereInput) {
    return this.prisma.ticket.findMany({
      where: criteria,
      orderBy: { updatedAt: 'desc' },
    });
  }

  listTicketsWithCriteria(
    criteria: Prisma.TicketWhereInput = {},
    skip?: number,
    take?: number,
  ): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      where: criteria,
      include: {
        ticketAgentAssignment: {
          select: { id: true, agentEmail: true },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            messages: {
              where: { isRead: false },
            },
          },
        },
      },
      skip,
      take,
      orderBy: { lastMessageAt: 'desc' },
    });
  }

  bulkCreateTicketAgentAssignment(
    data: Prisma.TicketAgentAssignmentCreateManyInput[],
  ) {
    return this.prisma.ticketAgentAssignment.createMany({ data });
  }

  bulkUpdateTicket(query: Prisma.TicketUpdateManyArgs) {
    return this.prisma.ticket.updateMany(query);
  }
}
