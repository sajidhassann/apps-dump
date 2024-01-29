import { TicketStatus } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class ActiveTicketsQuery {
  @IsNotEmpty({ message: 'page number is a required field.' })
  pageNumber: number;

  pageSize: number;

  search?: string;

  statuses?: TicketStatus[];
}
