import { ISlackUser } from '../interfaces/slack.user.interface';

export class SlackUser implements ISlackUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data?.real_name ?? '';
    this.email = data?.profile?.email ?? '';
  }
}
