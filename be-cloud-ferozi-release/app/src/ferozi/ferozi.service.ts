import { Injectable } from '@nestjs/common';
import { UserFeroziStatus, UserFerozi } from './models/user.ferozi.model';
import { RepositoryService } from './repository/repository.service';
import { Ferozi } from './models/ferozi.model';
import { TrinoService } from '../trino/trino/trino.service';
import { ConsumerService } from '../consumer/consumer.service';
import { Producer } from 'kafkajs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FeroziStat } from './models/ferozi.stat.mode';
import { FeroziNature } from '@prisma/client';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { ConfigKeys } from '../config/app.configuration';
import { AnalyticsService } from './analytics/analytics.service';

@Injectable()
export class FeroziService {
  private producer: Producer;
  private topicName: string;

  constructor(
    private readonly repository: RepositoryService,
    private consumer: ConsumerService,
    private config: ConfigService,
    private analytics: AnalyticsService,
  ) {
    this.setupProducer();
    this.topicName =
      this.config.get(ConfigKeys.USER_FEROZI_TOPIC) ?? 'FEROZI_TASKS';
  }

  async getAllFerozis() {
    return await this.repository.getAllFerozis();
  }

  async getFerozi(feroziID: string) {
    return this.repository.getFerozi(feroziID);
  }

  async setupProducer() {
    this.producer = await this.consumer.getProducer();
  }

  async createFerozi(ferozi: Ferozi) {
    const data = await this.repository.createFerozi(ferozi);
    await this.consumer.produce(this.producer, {
      topic: this.topicName,
      messages: [{ value: JSON.stringify(data) }],
    });

    return data;
  }

  private async getActiveUserFerozis(userID: string): Promise<UserFerozi[]> {
    const relevantUserFerozis = await this.repository.getUserFerozisByUserID(
      userID,
    );
    return relevantUserFerozis
      .map((userFerozi) => {
        return UserFerozi.fromModel(userFerozi);
      })
      .filter((userFerozi) => {
        return userFerozi.ferozi.isActive;
      });
  }

  async spinUpFerozisForUser(userID: string): Promise<UserFerozi[]> {
    const activeUserFerozis = await this.getActiveUserFerozis(userID);
    const spinnedUpUserFerozis = [];
    for await (const activeUserFerozi of activeUserFerozis) {
      const feroziStat = await this.analytics.getFeroziStats(
        activeUserFerozi.feroziID,
      );
      const currentCapacity = this.analytics.getCurrentCapacity(
        activeUserFerozi.ferozi,
        feroziStat,
      );
      if (currentCapacity >= activeUserFerozi.ferozi.maxCapacity) {
        if (activeUserFerozi.status != UserFeroziStatus.SAMPLE)
          spinnedUpUserFerozis.push(activeUserFerozi);
        continue;
      }
      if (activeUserFerozi.status == UserFeroziStatus.SAMPLE) {
        activeUserFerozi.updateFerozi();
        await this.repository.updateUserFerozi({
          feroziID: activeUserFerozi.feroziID,
          userID: activeUserFerozi.userID,
          status: activeUserFerozi.status,
          acknowledged: activeUserFerozi.acknowledged,
        });
      }
      spinnedUpUserFerozis.push(activeUserFerozi);
    }
    return spinnedUpUserFerozis;
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async runKurandazi() {
    const models = await this.repository.getActiveFerozi();
    const ferozies = models.map((ferozi) => Ferozi.fromModel(ferozi));
    await this.consumer.produce(this.producer, {
      topic: this.topicName,
      messages: ferozies.map((data) => {
        return { value: JSON.stringify(data) };
      }),
    });
  }

  async updateFerozi(ferozi: Partial<Ferozi>) {
    const data = await this.repository.updateFerozi(ferozi);
    await this.consumer.produce(this.producer, {
      topic: this.topicName,
      messages: [{ value: JSON.stringify(data) }],
    });
    return data;
  }

  deleteFerozi(feroziID: string): Promise<Ferozi> {
    return this.repository.deleteFerozi(feroziID);
  }

  addUserToFerozi(userID: string, feroziID: string) {
    return this.repository.createUserFerozi(
      userID,
      feroziID,
      UserFeroziStatus.SAMPLE,
    );
  }

  discardUserFerozi(userID: string, feroziID: string) {
    return this.repository.updateUserFerozi({
      userID,
      feroziID,
      status: UserFeroziStatus.DISCARD,
    });
  }

  updateUserFerozi(userID: string, feroziID: string) {
    return this.repository.updateUserFerozi({ userID, feroziID });
  }

  acknowledgeUserFerozi(userID: string, feroziID: string) {
    return this.repository.updateUserFerozi({
      userID: userID,
      feroziID: feroziID,
      acknowledged: true,
    });
  }
}
