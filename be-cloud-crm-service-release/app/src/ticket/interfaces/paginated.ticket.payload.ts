import { Prisma } from '@prisma/client';

export interface PaginatedTicketPayload {
  searchCriteria: Prisma.TicketWhereInput;
  pageSize: number;
  pageNumber: number;
}
