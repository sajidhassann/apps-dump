import { Item } from 'dynamoose/dist/Item';
import { ModelType } from 'dynamoose/dist/General';
import { model, Schema } from 'dynamoose';
import { v4 as uuid } from 'uuid';
import { Availability } from '../../constants/enums/availability.enum';

export const CohortModelSchema = {
  id: {
    type: 'String',
    default: uuid,
    hashKey: true,
  },
  name: {
    type: 'String',
  },
  adminID: {
    type: 'String',
    index: {
      name: 'byAdmin',
    },
  },
  type: {
    type: 'String',
  },
  availability: {
    type: 'String',
    default: Availability.RELEASED,
    index: {
      name: 'byAvailability',
    },
  },

};

export class CohortDbModel extends Item {
  id: string;
  name: string;
  adminID: string;
  type: string;
  availability: Availability;

  static getModel(tableName: string): ModelType<CohortDbModel> {
    const schema = new Schema(
      CohortModelSchema, 
      { timestamps: true, }
    );

    return model<CohortDbModel>(tableName, schema, {
      create: false,
      waitForActive: false,
    });
  }
}
