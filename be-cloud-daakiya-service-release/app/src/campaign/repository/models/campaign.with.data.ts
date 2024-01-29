import {Campaign, Cohort, NotificationMeta} from "@prisma/client";

export type CampaignWithData =
    Campaign & { campaignCohorts: { cohort: Cohort }[], notificationMeta: NotificationMeta }
    | null
