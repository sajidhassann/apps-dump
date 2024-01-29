import { Item } from 'dynamoose/dist/Item';
import { ModelType } from 'dynamoose/dist/General';
import { model, Schema } from 'dynamoose';
import { v4 as uuid } from 'uuid';

export const CallLogModelSchema = {
  id: {
    type: 'String',
    default: uuid,
    hashKey: true,
  },
  calledAt: {
    type: 'Number',
    default: Date.now(),
  },
  bucketCallID: {
    type: 'String',
    index: {
      name: 'byBucketCall',
    },
  },
  agentID: {
    type: 'String',
    index: {
      name: 'byAgent',
    },
  },
};

export class CallLogDbModel extends Item {
  id: string;
  agentID: string;
  bucketCallID: string;
  calledAt: number;

  static getModel(tableName: string): ModelType<CallLogDbModel> {
    const schema = new Schema(
      CallLogModelSchema,
      { timestamps: true, }
    );

    return model<CallLogDbModel>(tableName, schema, {
      create: false,
      waitForActive: false,
    });
  }
}
