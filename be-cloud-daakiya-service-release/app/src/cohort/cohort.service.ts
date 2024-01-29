import {Injectable} from "@nestjs/common";
import {Cohort} from "./models/cohort.model";
import {CohortRepository} from "./repository/cohort.repository";
import * as csvParser from "csv-parser";
import {Readable} from "node:stream";
import {MixpanelImportCohortModel} from "./models/mixpanel.import.cohort.model";
import {MixpanelUser} from "./models/mixpanelUser";
import {CohortUserReachable} from "./models/cohort.user.reachable.model";

@Injectable()
export class CohortService {
  constructor(private readonly repository: CohortRepository) {}

  async createCohort(name: string): Promise<Cohort> {
    const cohort = await this.repository.createCohort(name);
    return { id: cohort.id, name: cohort.name };
  }

  async listCohorts(): Promise<Cohort[]> {
    const cohorts = await this.repository.listCohorts();
    return cohorts.map((cohort) => ({ id: cohort.id, name: cohort.name }));
  }

  //TODO: Reafctor and remove the usage in notification.service.ts too.
  async getCohortUserIds(cohortID: string): Promise<string[]> {
    const cohortUsers = await this.repository.getCohortUserIds(cohortID);
    return cohortUsers.map((user) => user.userID);
  }


  //TODO: Add test for this method
  async getCohortUsers(cohortID: string): Promise<CohortUser[]> {
    const cohortUsersWithTokens =
      await this.repository.getCohortUsersWithTokens(cohortID);
    return cohortUsersWithTokens.map((user) => ({
      userID: user.id,
      reachable: user.tokens.length > 0,
      tokens: user.tokens ? user.tokens.map((token) => token.token) : [],
    }));
  }

  //TODO: Add test for this method
  async getCohortUserReachableCount(cohortID: string): Promise<CohortUserReachable> {
    const users =
      await this.repository.getCohortUsersCount(cohortID);
    const reachable = await this.repository.getCohortUsersCountWithTokens(cohortID)

    return {users, reachable}

  }

  //TODO: Add test for this method
  async getCohortsUserReachableCount(cohortIDs: string[]): Promise<CohortUserReachable> {
    const [{count: users}] =
      await this.repository.getCohortsUsersCount(cohortIDs);
    const [{count: reachable}] = await this.repository.getCohortsUsersCountWithTokens(cohortIDs)

    return {users, reachable}
  }

  async bulkAddCohortUsersFromCSV(file: Express.Multer.File, cohortID: string) {
    const userIDs = await this.extractUserIDsFromFile(file);
    console.log(userIDs);
    return this.addCohortUsers(cohortID, userIDs.map(id=> new MixpanelUser({"User ID": id})));
  }

  async bulkReplaceCohortUsersFromCSV(
    file: Express.Multer.File,
    cohortID: string,
  ) {
    const userIDs = await this.extractUserIDsFromFile(file);
    return await this.replaceCohortUsers(cohortID, userIDs);
  }

  async importCohortFromMixpanel(data: MixpanelImportCohortModel) {
    if (data.action === 'remove_members') {
      return;
    }
    console.log(
      '!!!INFO : MIXPANEL IMPORT COHORT REQUEST FROM SERVICE',
      'userIDs size',
      data.mixpanelUsers.length,
    );
    await this.repository.createCohortIfNotExists({
      id: data.cohortID,
      name: data.cohortName,
    });
    return this.addCohortUsers(
      data.cohortID,
      data.mixpanelUsers,
    );
  }

  private async addCohortUsers(
    cohortID: string,
    userIDs: MixpanelUser[],
  ) {
    if (userIDs.length === 0) {
      return null;
    }
    await this.repository.createUsersIfNotExists(userIDs);
    return this.repository.addCohortUsers(cohortID, userIDs);
  }

  private async replaceCohortUsers(
    cohortID: string,
    userIDs: string[],
  ): Promise<boolean> {
    userIDs = this.removeDuplicateUserIDs(userIDs);
    const cohortUsers = await this.repository.getCohortUserIds(cohortID);
    if (cohortUsers) {
      const cohortUserIDs = cohortUsers.map((user) => user.userID);
      const usersToRemove = cohortUserIDs.filter((id) => !userIDs.includes(id));
      if (usersToRemove.length > 0) {
        await this.repository.removeCohortUsers(cohortID, usersToRemove);
      }
      const usersToAdd = userIDs.filter((id) => !cohortUserIDs.includes(id)).map(id=> new MixpanelUser({"User ID": id}));
      if (usersToAdd.length > 0) {
        await this.repository.createUsersIfNotExists(usersToAdd);
        await this.repository.addCohortUsers(cohortID, usersToAdd);
      }
      return true;
    }
    return false;
  }

  private async extractUserIDsFromFile(
    file: Express.Multer.File,
  ): Promise<string[]> {
    if (!file) throw new Error('No file provided');

    const userIDs: string[] = [];

    let userColumnFound = false;

    await new Promise<void>((resolve, reject) => {
      const readableStream = new Readable();
      readableStream.push(file.buffer);
      readableStream.push(null);

      readableStream
        .pipe(csvParser())
        .on('data', (row) => {
          if (row.user_id) {
            userIDs.push(row.user_id);
            userColumnFound = true;
          }
        })
        .on('end', () => {
          if (!userColumnFound) {
            reject(new Error('user_id column not found in the CSV file.'));
          } else {
            resolve();
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    return userIDs;
  }

  private removeDuplicateUserIDs(userIDs: string[]): string[] {
    return [...new Set(userIDs)];
  }
}
