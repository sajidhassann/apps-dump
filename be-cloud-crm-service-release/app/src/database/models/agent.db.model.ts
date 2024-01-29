import { Item } from 'dynamoose/dist/Item';
import { ModelType } from 'dynamoose/dist/General';
import { model, Schema } from 'dynamoose';
import { v4 as uuid } from 'uuid';

export const AgentModelSchema = {
  id: {
    type: 'String',
    default: uuid,
    hashKey: true,
  },
  fname: 'String',
  lname: 'String',
  email: 'String',
  phoneNumber: 'String',
  status: {
    type: 'String',
    default: 'ENABLE',
  },
  role: {
    type: 'String',
    index: {
      name: 'byRole',
    },
  },
};

export class AgentDbModel extends Item {
  id: string;
  fname: string;
  lname: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: string;

  static getModel(tableName: string): ModelType<AgentDbModel> {
    const schema = new Schema(
      AgentModelSchema,
      // { timestamps: true, }
    );
    return model<AgentDbModel>(tableName, schema, {
      create: false,
      waitForActive: false,
    });
  }
}
