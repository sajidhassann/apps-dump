export interface INotionUser {
  readonly id: string;
  readonly name: string;
  readonly avatar_url: string;
  readonly type: string;
  readonly person: {
    readonly email: string;
  };
}
