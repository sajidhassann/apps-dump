import {CampaignNotificationMeta} from './campaign.notification.meta.model';

export enum CampaignStatus {
    INITIATED = 'INITIATED',
    CREATION_IN_PROGRESS = 'CREATION_IN_PROGRESS',
    CREATION_COMPLETE = 'CREATION_COMPLETE',
    SENDING_IN_PROGRESS = 'SENDING_IN_PROGRESS',
    SENDING_COMPLETE = 'SENDING_COMPLETE'
}

export class Campaign {
    id?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    status?: CampaignStatus;
    campaignCohortIDs?: string[];
    notificationMeta: CampaignNotificationMeta;

    constructor(data: Campaign) {
        this.id = data.id;
        this.name = data.name;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.status = data.status;
        this.campaignCohortIDs = data.campaignCohortIDs;
        this.notificationMeta = new CampaignNotificationMeta(data.notificationMeta);
    }
}
