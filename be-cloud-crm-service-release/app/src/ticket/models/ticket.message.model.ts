import { TicketMode } from 'src/database/models/ticket.db.model';
import { TicketMessageDbModel } from 'src/database/models/ticket.message.db.model';

export class TicketMessageModel {
  id: string;
  ticketID: string;
  content: string;
  recipientID: string;
  type: TicketMode;
  mimeType?: string;
  mediaURL?: string;
  metaID?: string;
  updatedAt: Date;
  createdAt: Date;

  constructor(data: TicketMessageDbModel) {
    this.id = data.id ?? '';
    this.ticketID = data.ticketID ?? '';
    this.content = data.content ?? '';
    this.recipientID = data.recipientID ?? '';
    this.type = data.type ?? TicketMode.CHAT_BOT;
    this.mimeType = data.mimeType ?? '';
    this.mediaURL = data.mediaURL ?? '';
    this.metaID = data.metaID ?? '';
    this.updatedAt = new Date(data.updatedAt);
    this.createdAt = new Date(data.createdAt);
  }
}
