import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphqlHelper } from 'appsync-graphql-helper';
import { ConfigKeys } from 'src/config/app.configuration';
import Query from './graphql/queries';

@Injectable()
export class AppSyncService {
  private readonly graphql: any;
  constructor(private readonly config: ConfigService) {
    this.graphql = new GraphqlHelper(
      this.config.get<string>(ConfigKeys.ADMIN_API_URL),
    );
  }
  async getUserByNumber(number: string) {
    const response = await this.graphql.query(Query.listUsersByNumber, {
      number,
    });
    console.log('USER FOUND MAQSAD', JSON.stringify(response));
    return response.data?.listUsersByNumber?.items?.[0];
  }
  async getUserGradeGroup(id: string) {
    const response = await this.graphql.query(Query.getUserGradeGroup, {
      id,
    });
    console.log('USER GRADE GROUP FOUND MAQSAD', JSON.stringify(response));
    return response.data?.getUserGradeGroup;
  }
}
