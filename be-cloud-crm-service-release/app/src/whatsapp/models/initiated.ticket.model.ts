import { Ticket } from '@prisma/client';
import { WhatsAppDTO } from './whatsapp.message.model';

export class InitiatedTicket {
  readonly whatsAppPayload: WhatsAppDTO;

  constructor(ticket: Ticket, payload: WhatsAppDTO) {
    this._ticket = ticket;
    this.whatsAppPayload = payload;
  }

  private _ticket: Ticket;

  get ticket(): Ticket {
    return this._ticket;
  }

  set ticket(value: Ticket) {
    this._ticket = value;
  }
}
