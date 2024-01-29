import PaginatedList from '../../models/paginated.list';
import { TicketStatus } from '@prisma/client';

export class AgentTicketPaginatedList extends PaginatedList {
  readonly agentID: string;
  readonly statuses?: TicketStatus[] = [
    TicketStatus.PENDING,
    TicketStatus.UNREAD,
    TicketStatus.OPEN,
  ];

  constructor(data: AgentTicketPaginatedList) {
    super(data);
    this.agentID = data.agentID;
    this.statuses = data.statuses
      ? JSON.parse(data.statuses?.toString())
      : [TicketStatus.PENDING, TicketStatus.UNREAD, TicketStatus.OPEN];
  }
}
