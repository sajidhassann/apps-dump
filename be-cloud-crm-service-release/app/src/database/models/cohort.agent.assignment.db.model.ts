import { Item } from 'dynamoose/dist/Item';
import { ModelType } from 'dynamoose/dist/General';
import { model, Schema } from 'dynamoose';
import { v4 as uuid } from 'uuid';
import { Availability } from '../../constants/enums/availability.enum';

export const CohortAgentAssignmentModelSchema = {
  id: {
    type: 'String',
    default: uuid,
    hashKey: true,
  },
  bucketID: {
    type: 'String',
    index: {
      name: 'byBucket',
    },
  },
  agentID: {
    type: 'String',
    index: {
      name: 'byAgent',
    },
  },
  availability: {
    type: 'String',
    default: Availability.RELEASED,
    index: {
      name: 'byAvailability',
    },
  },
};

// UNREAD => mode = 'AGENT' || status = 'UNREAD'
// READ => 'mode' = 'AGENT' || status !== 'UNREAD'

export class CohortAgentAssignmentDbModel extends Item {
  id: string;
  bucketID: string;
  agentID: string;
  availability: Availability;

  static getModel(
    tableName: string,
  ): ModelType<CohortAgentAssignmentDbModel> {

    console.log("tbale", tableName)
    const schema = new Schema(
      CohortAgentAssignmentModelSchema,
      { timestamps: true, }
    );
    
    return model<CohortAgentAssignmentDbModel>(tableName, schema, {
      create: false,
      waitForActive: false,
    });
  }
}
