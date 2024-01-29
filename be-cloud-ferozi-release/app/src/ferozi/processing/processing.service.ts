import { Injectable } from '@nestjs/common';
import { TrinoService } from '../../trino/trino/trino.service';
import { RepositoryService } from '../repository/repository.service';
import { QueryData } from 'trino-client';
import { Ferozi } from '../models/ferozi.model';
import { UserFerozi, UserFeroziStatus } from '../models/user.ferozi.model';
import { ConsumerService } from '../../consumer/consumer.service';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { EachMessagePayload } from 'kafkajs';
import { ConfigKeys } from '../../config/app.configuration';

@Injectable()
export class ProcessingService {
  private topicName: string;

  constructor(
    private readonly trino: TrinoService,
    private readonly repository: RepositoryService,
    private consumer: ConsumerService,
    private config: ConfigService,
  ) {
    this.topicName =
      this.config.get(ConfigKeys.USER_FEROZI_TOPIC) ?? 'FEROZI_TASKS';
  }

  async processUserFerozis(ferozi: Ferozi, insertionBatchSize: number) {
    // RUN AND VALIDATE QUERY
    const validatedUserIDs = await this.runAndValidateQuery(ferozi.sqlQuery);
    // TRANSFORM
    const userFerozis = this.transformQueryData(validatedUserIDs, ferozi);
    this.logQueryStat(`Validated query data ${userFerozis.length} rows`);
    // BATCH INSERT USER FEROZIS
    const addedUsersCount = await this.batchInsertUserFerozis(
      userFerozis,
      insertionBatchSize,
    );
    return addedUsersCount;
  }

  onModuleInit(): any {
    this.listen();
  }

  async runAndValidateQuery(sqlQuery: string) {
    // RUN TRINO QUERY
    const queryData = await this.runQuery(sqlQuery);
    // VALIDATE QUERY RESPONSE
    const validatedUserIDs = this.validateQueryData(queryData);
    return validatedUserIDs;
  }

  async batchInsertUserFerozis(userFerozis: UserFerozi[], batchSize: number) {
    const batchCount = Math.ceil(userFerozis.length / batchSize);
    this.logQueryStat(`Starting insertion in ${batchCount} batches`);
    const addedUsers = [];
    for (let i = 0; i < batchCount; i++) {
      const batch = userFerozis.slice(i * batchSize, (i + 1) * batchSize);
      await this.repository.createUserFerozisIfNotExsist(batch);
      this.logQueryStat(`Batch # ${i} inserted ${batch.length} users`);
      addedUsers.push(...batch);
    }

    this.logQueryStat(`Total inserted users ${addedUsers.length}`);
    return addedUsers;
  }

  validateQueryData(queryData: QueryData[]): string[] {
    this.logQueryStat(
      `Starting validation on query data of length ${queryData.length}`,
    );
    //EXTRACT USER IDS
    const userIDs = this.extractUserIDs(queryData);
    //REMOVE NULL USER IDS
    const filteredUserIDs = this.removeNullUserIDs(userIDs);
    const nullUserIDsCount = queryData.length - filteredUserIDs.length;
    this.logQueryStat(
      `Removed ${nullUserIDsCount} null userIDs from user ferozis`,
    );
    // FILTER DUPLICATE USER IDS
    const filteredDuplicateUserIDs =
      this.removeDuplicateUserIDs(filteredUserIDs);
    const duplicateUserIDsCount =
      filteredUserIDs.length - filteredDuplicateUserIDs.length;
    this.logQueryStat(
      `Removed ${duplicateUserIDsCount} duplicate user ferozis`,
    );
    //CHECK EMPTY
    if (filteredDuplicateUserIDs.length === 0) {
      throw new Error('No user IDs found');
    }

    // CHECK FIRST COLUMN IS UUID
    const firstRow = filteredDuplicateUserIDs[0];
    if (!this.isUUID(firstRow)) {
      throw new Error('Should contain UUID as first column');
    }

    return filteredDuplicateUserIDs;
  }

  private async runQuery(sqlQuery: string): Promise<QueryData[]> {
    this.logQueryStat(`Running query - ${sqlQuery}`);
    const data = await this.trino.runTrinoQuery(sqlQuery);
    this.logQueryStat(`Query returned ${data.length} rows`);
    return data;
  }

  private transformQueryData(userIDs: string[], ferozi: Ferozi): UserFerozi[] {
    const data = userIDs.map((id) => {
      return new UserFerozi(ferozi.id, id, UserFeroziStatus.SAMPLE, false);
    });
    this.logQueryStat(
      `Transformed query data to user ferozis of length ${data.length}`,
    );
    return data;
  }

  private extractUserIDs(queryData: QueryData[]): string[] {
    return queryData.map((row) => {
      return row[0];
    });
  }

  private removeNullUserIDs(userIDs: string[]): string[] {
    return userIDs.filter((id) => {
      return id != null;
    });
  }

  private removeDuplicateUserIDs(userIDs: string[]): string[] {
    const alreadyAdded = {};
    return userIDs.filter((id) => {
      if (alreadyAdded[id]) {
        return false;
      }
      alreadyAdded[id] = true;
      return true;
    });
  }

  private isUUID(userID: string): boolean {
    return typeof userID === 'string' && userID.length === 36;
  }

  private logQueryStat(message: string) {
    console.log(`Ferozi Query Service - ${message}`);
  }

  private listen() {
    this.consumer
      .consume(
        { topics: [this.topicName] },
        {
          eachMessage: async (payload: EachMessagePayload) => {
            try {
              const data = Ferozi.fromJson(
                JSON.parse(payload.message.value?.toString()),
              );
              await this.processUserFerozis(
                data,
                this.config.get(ConfigKeys.USER_FEROZI_INSERT_BATCH_SIZE) ??
                  1000,
              );
            } catch (e) {
              console.log('failed to process message', e);
            }
          },
        },
      )
      .then(() => {
        console.log('Listening');
      })
      .catch((error) => console.error('Failed to listen', error));
  }
}
