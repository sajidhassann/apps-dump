import { Campaign } from './campaign';
import { CampaignNotificationMeta } from './campaign.notification.meta.model';
import { CampaignUser } from './campaign.user';

export class CampaignSendNotificationToUsers {
  campaignUsers: CampaignUser[];
  campaign: Campaign;

  constructor(data: CampaignSendNotificationToUsers) {
    this.campaignUsers = data.campaignUsers.map(
      (user) => new CampaignUser(user),
    );
    this.campaign = new Campaign(data.campaign);
  }
}
