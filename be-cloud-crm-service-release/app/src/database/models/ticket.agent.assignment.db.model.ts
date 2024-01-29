import { Item } from 'dynamoose/dist/Item';
import { ModelType } from 'dynamoose/dist/General';
import { model, Schema } from 'dynamoose';
import { v4 as uuid } from 'uuid';

export const TicketAgentAssignmentModelSchema = {
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
  agentID: {
    type: 'String',
    index: {
      name: 'byAgent',
    },
  },
};

export class TicketAgentAssignmentDbModel extends Item {
  id: string;
  ticketID: string;
  agentID: string;

  static getModel(tableName: string): ModelType<TicketAgentAssignmentDbModel> {
    const schema = new Schema(TicketAgentAssignmentModelSchema, {
      timestamps: true,
    });
    return model<TicketAgentAssignmentDbModel>(tableName, schema, {
      create: false,
      waitForActive: false,
    });
  }
}
