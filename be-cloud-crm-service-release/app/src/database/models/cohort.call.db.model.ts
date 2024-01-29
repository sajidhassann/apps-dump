import { model, Schema } from 'dynamoose';
import { ModelType } from 'dynamoose/dist/General';
import { Item } from 'dynamoose/dist/Item';
import { CallStatus } from 'src/constants/enums/call.status.enum';
import { v4 as uuid } from 'uuid';
import { Availability } from '../../constants/enums/availability.enum';

export const CohortCallModelSchema = {
  id: {
    type: 'String',
    default: uuid,
    hashKey: true,
  },
  fName: 'String',
  lName: 'String',
  cohortID: {
    type: 'String',
    index: {
      name: 'byCohortByCreatedAt',
    },
  },
  notes: 'String',
  interestedIn: 'String',
  number: 'String',
  isTuition: 'Boolean',
  subjects: {
    type: 'Array',
    schema: [String],
  },
  tags: {
    type: 'Array',
    schema: [String],
  },
  board: 'String',
  phoneType: 'String',
  status: {
    type: 'String',
    default: 'PENDING',
  },
  agentID: {
    type: 'String',
    index: {
      name: 'byAgent',
    },
    agentEmail: 'String',
  },
  availability: {
    type: 'String',
    default: Availability.RELEASED,
    index: {
      name: 'byAvailability',
    },
  },
};

export class CohortCallDbModel extends Item {
  id: string;
  fName: string;
  lName: string;
  cohortID: string;
  notes: string;
  interestedIn: string;
  phoneType: string;
  agentID?: string;
  number: string;
  board: string;
  subjects: string[];
  tags: string[];
  isTuition: boolean;
  status: CallStatus;
  availability: Availability;
  createdAt?: Date;
  updatedAt?: Date;

  static getModel(tableName: string): ModelType<CohortCallDbModel> {
    const schema = new Schema(CohortCallModelSchema, { timestamps: true });

    return model<CohortCallDbModel>(tableName, schema, {
      create: false,
      waitForActive: false,
    });
  }
}
