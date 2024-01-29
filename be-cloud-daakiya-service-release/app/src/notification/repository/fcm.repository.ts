import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';
import { AppLogger } from '../../app.logger';
import { Notification } from '../models/notification';
import { FCM_NOTIFICATION_BATCH_SIZE } from '../notification.constants';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from '../../config/app.configuration';
import { FcmNotification } from './models/fcm.notification';


@Injectable()
export class FCMRepository {
  private readonly fcmKey: admin.ServiceAccount;

  constructor(
    private readonly logger: AppLogger,
    private readonly config: ConfigService,
  ) {
    this.fcmKey =
      JSON.parse(
        this.config.get<string>(ConfigKeys.FCM_KEY) ?? '',
      ) ?? {};
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          this.fcmKey,
        ),
      });
    }
  }

  async sendNotificationToTokens(tokens: string[], notification: FcmNotification)  {
    if (tokens.length < FCM_NOTIFICATION_BATCH_SIZE) {
      const message: admin.messaging.MulticastMessage = {
        tokens: tokens,
        android: {
          data: {
            id: notification.id,
            title: notification.title,
            body: notification.body,
            click_action: notification.click_action ?? '',
          }
        }
      };
      const response = await admin.messaging().sendEachForMulticast(message);
      this.logger.log(
        `Successfully sent message to: ${response.successCount} devices out of ${tokens.length}`,
      );
      return response;
    } else {
      throw Error(
        `Messages sent through FCM must not be greater than ${FCM_NOTIFICATION_BATCH_SIZE}`,
      );
    }
  }
}
