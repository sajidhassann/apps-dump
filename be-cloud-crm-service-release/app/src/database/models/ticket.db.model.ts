import { Item } from 'dynamoose/dist/Item';
import { ModelType } from 'dynamoose/dist/General';
import { model, Schema } from 'dynamoose';
import { v4 as uuid } from 'uuid';

export const TicketModelSchema = {
  id: {
    type: 'String',
    default: uuid,
    hashKey: true,
  },
  phoneNumber: {
    type: 'String',
    index: {
      name: 'byPhoneNumber',
    },
  },
  userName: 'String',
  status: {
    type: 'String',
    default: 'PENDING', // Pending, Assigned, Opened & Closed
    index: {
      name: 'byStatus',
    },
  },
  tags: {
    type: Array,
    schema: [String],
  },
  isRead: {
    type: Boolean,
  },
  mode: {
    type: 'String',
    default: 'CHAT_BOT', // CHAT_BOT, AGENT
    index: {
      name: 'byAgent',
    },
  },
};

export enum TicketMode {
  CHAT_BOT = 'CHAT_BOT',
  AGENT = 'AGENT',
}

export class TicketDbModel extends Item {
  id: string;
  userName: string;
  phoneNumber: string;
  status: string;
  mode: TicketMode;
  tags: string[];
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;

  static getModel(tableName: string): ModelType<TicketDbModel> {
    const schema = new Schema(TicketModelSchema, { timestamps: true });
    return model<TicketDbModel>(tableName, schema, {
      create: false,
      waitForActive: false,
    });
  }
}
