export class CampaignUser {
  userID: string;
  tokens: string[];

  constructor(data: CampaignUser) {
    this.userID = data.userID;
    this.tokens = data.tokens ?? [];
  }
}
