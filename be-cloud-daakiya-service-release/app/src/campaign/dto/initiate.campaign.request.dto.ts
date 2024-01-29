import { IsNotEmpty } from 'class-validator';

export class InitiateCampaignRequestDTO {
  @IsNotEmpty()
  name: string;
  campaignCohortIDs: string[];
  notificationMeta: CampaignNotificationMetaDTO;
}

class CampaignNotificationMetaDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  link?: string;
}
