import { Prisma } from '@prisma/client';

export interface UpdateTicketsWithCriteria {
  data: Prisma.TicketUpdateWithoutMessagesInput;
  where: Prisma.TicketWhereInput;
}
