import { DatabaseService } from './../database/database.service';
import { Injectable } from '@nestjs/common';
import { UserWhatsappTrackingModel } from './models/user.whatsapp.tracking.model';
import { UserWhatsappChatTrackingDbModel } from '../database/models/user.whatsapp.chat.tracking.db.model';

@Injectable()
export class UserWhatsappTrackingService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUserWhatsAppTracking(
    id: string,
  ): Promise<UserWhatsappTrackingModel | undefined> {
    console.log('id INSDIE getUserWhatsAppTracking', id);
    const whatsAppTracking =
      await this.databaseService.getUserWhatsappChatTracking(id);

    console.log('whatsAppTracking', whatsAppTracking);

    return whatsAppTracking
      ? new UserWhatsappTrackingModel(whatsAppTracking)
      : undefined;
  }

  async createUserWhatsAppTracking(
    data: UserWhatsappTrackingModel,
  ): Promise<UserWhatsappTrackingModel> {
    const whatsAppTracking =
      await this.databaseService.createUserWhatsappChatTracking(
        data as UserWhatsappChatTrackingDbModel,
      );

    return new UserWhatsappTrackingModel(whatsAppTracking);
  }

  async updateUserWhatsAppTracking(
    data: UserWhatsappTrackingModel,
  ): Promise<UserWhatsappTrackingModel> {
    const whatsAppTracking =
      await this.databaseService.updateUserWhatsappChatTracking(
        data as UserWhatsappChatTrackingDbModel,
      );

    return new UserWhatsappTrackingModel(whatsAppTracking);
  }
}
