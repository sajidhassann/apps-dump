import { TicketStatus } from '@prisma/client';
import PaginatedList from '../../models/paginated.list';

export class ActiveTicketPaginatedList extends PaginatedList {
  readonly statuses?: TicketStatus[] = [
    TicketStatus.PENDING,
    TicketStatus.UNREAD,
    TicketStatus.OPEN,
  ];

  constructor(data: ActiveTicketPaginatedList) {
    super(data);
    this.statuses = data.statuses
      ? JSON.parse(data.statuses?.toString())
      : [TicketStatus.PENDING, TicketStatus.UNREAD, TicketStatus.OPEN];
  }
}
