import { Campaign } from './campaign';

export class CampaignStats{
    campaign: Campaign;
    totalTargetedUsers: number;
    totalNotificationsSent: number;
    totalNotificationsFailed: number;
    totalNotificationsDelivered: number;
    totalNotificationsOpened: number;
    totalUserSent: number;
    totalUserFailed: number;
    totalUserDelivered: number;

    constructor(data: CampaignStats) {
        this.campaign = new Campaign(data.campaign);
        this.totalTargetedUsers = data.totalTargetedUsers;
        this.totalNotificationsSent = data.totalNotificationsSent;
        this.totalNotificationsFailed = data.totalNotificationsFailed;
        this.totalNotificationsDelivered = data.totalNotificationsDelivered;
        this.totalNotificationsOpened = data.totalNotificationsOpened;
        this.totalUserSent = data.totalUserSent;
        this.totalUserFailed = data.totalUserFailed;
        this.totalUserDelivered = data.totalUserDelivered;
    }


}