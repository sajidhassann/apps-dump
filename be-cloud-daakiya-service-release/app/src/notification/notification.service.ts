import { Injectable, NotFoundException } from '@nestjs/common';
import { CohortService } from '../cohort/cohort.service';
import { RegistrationService } from '../registration/registration.service';
import { FCMRepository } from './repository/fcm.repository';
import { Notification } from './models/notification';
import { NotificationStatus } from './models/notification.status';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';
import { AppLogger } from '../app.logger';
import { NOTIFICATION_BATCH_SIZE } from './notification.constants';
import { UserService } from '../user/user.service';
import { NotificationRepository } from './repository/notification.repository';
import { NotificationStats } from './models/notification.stats';
import { UpdateNotificationStatus } from './models/update.notification.status';
import { NotificationMeta, Token } from '@prisma/client';
import { error } from 'console';

@Injectable()
export class NotificationService {
  constructor(
    private readonly cohortService: CohortService,
    private readonly registrationService: RegistrationService,
    private readonly userService: UserService,
    private readonly fcmRepository: FCMRepository,
    private readonly appLogger: AppLogger,
    private readonly repository: NotificationRepository,
  ) {}

  async sendNotificationToCohortUsers(
    cohortID: string,
    notification: Notification,
  ) {
    const userIDs = await this.getCohortUserIds(cohortID);
    const tokens = await this.getTokensForUsers(userIDs);
    await this.sendNotificationToTokens(tokens, notification);
  }

  async sendNotificationToUsers(userIDs: string[], notification: Notification) {
    const tokens = await this.getTokensForUsers(userIDs);
    await this.sendNotificationToTokens(tokens, notification);
  }

  async sendNotificationToAllUsers(notification: Notification) {
    const userIDs = (await this.userService.getUsersWithTokens()) as string[];
    await this.sendNotificationToUsers(userIDs, notification);
  }

  async sendNotificationToUser(userID: string, notification: Notification) {
    const tokens = await this.getTokensForUsers([userID]);
    console.log(JSON.stringify(tokens));
    await this.sendNotificationToTokens(tokens, notification);
  }

  async getNotificationStats(metaID: string): Promise<NotificationStats> {
    const data = await this.repository.getNotificationsStats(metaID);
    const stat = data.reduce((map: Record<string, number>, val) => {
      map[val.status] = val.count;
      return map;
    }, {});
    return new NotificationStats({
      received: stat[NotificationStatus.RECEIVED] ?? 0,
      opened: stat[NotificationStatus.OPEN] ?? 0,
      failed: stat[NotificationStatus.FAILED] ?? 0,
      sent: stat[NotificationStatus.SENT] ?? 0,
    });
  }

  changeNotificationStatus({
    status,
    id: metaID,
    fcmMessageID,
  }: UpdateNotificationStatus) {
    return this.repository.updateNotifications(
      {
        status,
      },
      {
        metaID,
        fcmMessageID,
      },
    );
  }

  private async getTokensForUsers(userIDs: string[]): Promise<Token[]> {
    const userTokens = await this.registrationService.getTokensForUsers(
      userIDs,
    );
    if (!userTokens.length) throw new NotFoundException('No tokens for users');
    return userTokens;
  }

  private async getCohortUserIds(cohortID: string): Promise<string[]> {
    const userIDs = await this.cohortService.getCohortUserIds(cohortID);
    if (!userIDs.length) throw new NotFoundException('No users in cohort');
    return userIDs;
  }

  private async createNotificationMeta(notification: Notification) {
    return this.repository.createNotificationMeta({
      title: notification.title,
      body: notification.body,
      link: notification.link,
    });
  }

  private async storeNotification(
    batch: string[],
    batchResponse: BatchResponse,
    notificationMeta: NotificationMeta,
    data: Record<string, string>,
  ) {
    const notifications = batchResponse.responses.map((response, index) => {
      const token = batch[index];
      const fcmMessageID = response.messageId?.split('/')?.pop() ?? '';
      if (response.success) {
        return {
          fcmMessageID,
          metaID: notificationMeta.id,
          userID: data[token],
          token,
          status: NotificationStatus.SENT,
        };
      }        
      return {
        fcmMessageID,
        metaID: notificationMeta.id,
        userID: data[token],
        token,
        status: NotificationStatus.FAILED,
        fcmErrorCode: response.error?.code.split('/')?.pop(),
        fcmErrorDetails: response.error?.message,
      };
    });

    return this.repository.createNotifications(notifications);
  }

  private async sendNotificationToTokens(
    tokens: Token[],
    notification: Notification,
  ) {
    const data = tokens.reduce((map: Record<string, string>, val) => {
      map[val.token] = val.userID ?? '';
      return map;
    }, {});

    const notificationMeta = await this.createNotificationMeta(notification);

    const fcmTokens = Object.keys(data);

    const batches: string[][] = [];

    for (let i = 0; i < tokens.length; i += NOTIFICATION_BATCH_SIZE) {
      batches.push(fcmTokens.slice(i, i + NOTIFICATION_BATCH_SIZE));
    }

    for (const batch of batches) {
      try {
        const batchResponse = await this.fcmRepository.sendNotificationToTokens(
          batch,
          {
            ...notification,
            id: notificationMeta.id,
            click_action: notification.link,
          },
        );
        await this.storeNotification(
          batch,
          batchResponse,
          notificationMeta,
          data,
        );
        console.log(batchResponse);
      } catch (err) {
        this.appLogger.error(err);
      }
    }
  }
}
