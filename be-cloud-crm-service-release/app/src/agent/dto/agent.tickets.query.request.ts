import { IsNotEmpty } from 'class-validator';
import { TicketStatus } from '@prisma/client';

export class AgentTicketsQuery {
  @IsNotEmpty({ message: 'page number is a required field.' })
  pageNumber: number;

  pageSize: number;

  search?: string;

  statuses?: TicketStatus[];
}
