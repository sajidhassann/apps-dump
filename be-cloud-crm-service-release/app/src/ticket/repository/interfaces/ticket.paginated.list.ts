import { TicketStatus } from '@prisma/client';

export interface ITicketPaginatedList {
  statuses: TicketStatus[];
  skip: number;
  take: number;
}
