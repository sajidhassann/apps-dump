import {
  TicketDbModel,
  TicketMode,
} from './../../database/models/ticket.db.model';

export class TicketModel {
  id: string;
  userName: string;
  status: string;
  phoneNumber: string;
  mode: TicketMode;
  tags: string[];
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: TicketDbModel) {
    this.id = data.id ?? '';
    this.userName = data.userName ?? '';
    this.status = data.status ?? '';
    this.phoneNumber = data.phoneNumber ?? '';
    this.mode = data.mode ?? TicketMode.CHAT_BOT;
    this.tags = data.tags ?? [];
    this.isRead = data.isRead ?? false;
    this.createdAt = new Date(data?.createdAt);
    this.updatedAt = new Date(data?.updatedAt);
  }
}
