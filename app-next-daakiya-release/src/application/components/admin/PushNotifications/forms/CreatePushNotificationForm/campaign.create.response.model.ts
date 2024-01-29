export interface CampaignCreateRequestModel {
    name: string,
    notificationMeta?: NotificationMeta,
    campaignCohortIDs: string[]
}

type NotificationMeta = {
    title: string,
    body: string,
    link?: string
}