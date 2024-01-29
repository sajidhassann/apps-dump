import { TicketStatus } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class InactiveTicketsQuery {
  @IsNotEmpty({ message: 'page number is a required field.' })
  pageNumber: number;

  pageSize: number;

  search?: string;

  statuses?: TicketStatus[];
}
