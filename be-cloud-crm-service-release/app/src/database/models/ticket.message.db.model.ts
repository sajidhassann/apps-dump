import { Item } from 'dynamoose/dist/Item';
import { ModelType } from 'dynamoose/dist/General';
import { model, Schema } from 'dynamoose';
import { v4 as uuid } from 'uuid';
import { TicketMode } from './ticket.db.model';

export const TicketMessageModelSchema = {
  id: {
    type: 'String',
    default: uuid,
    hashKey: true,
  },
  ticketID: {
    type: 'String',
    index: {
      name: 'byTicket',
    },
  },
  content: 'String',
  recipientID: {
    type: 'String',
  },
  type: 'String', // USER || AGENT
  mimeType: 'String',
  mediaURL: 'String',
  metaID: 'String',
};

export class TicketMessageDbModel extends Item {
  id: string;
  ticketID: string;
  content: string;
  recipientID: string;
  type: TicketMode;
  mimeType?: string;
  mediaURL?: string;
  metaID?: string;
  createdAt: Date;
  updatedAt: Date;

  static getModel(tableName: string): ModelType<TicketMessageDbModel> {
    const schema = new Schema(TicketMessageModelSchema, { timestamps: true });
    return model<TicketMessageDbModel>(tableName, schema, {
      create: false,
      waitForActive: false,
    });
  }
}
