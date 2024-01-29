import { Item } from 'dynamoose/dist/Item';
import { ModelType } from 'dynamoose/dist/General';
import { model, Schema } from 'dynamoose';
import { v4 as uuid } from 'uuid';
import { WhatsAppMessageStatus } from 'src/constants/enums/whatsapp.message.status.enum';

export const UserWhatsAppChatTrackingSchema = {
  id: {
    // this is mobile number
    type: 'String',
    default: uuid,
    hashKey: true,
  },
  name: {
    type: 'String',
  },
  currentMenu: {
    type: 'String',
  },
  menuSent: {
    type: 'Boolean',
  },
  status: {
    type: 'String',
    default: WhatsAppMessageStatus.UNAVAILABLE,
  },
};

export class UserWhatsappChatTrackingDbModel extends Item {
  id: string;
  name: string;
  currentMenu: string;
  menuSent: boolean;
  status: WhatsAppMessageStatus;

  static getModel(
    tableName: string,
  ): ModelType<UserWhatsappChatTrackingDbModel> {
    const schema = new Schema(UserWhatsAppChatTrackingSchema, {
      timestamps: true,
    });

    return model<UserWhatsappChatTrackingDbModel>(tableName, schema, {
      create: false,
      waitForActive: false,
    });
  }
}
