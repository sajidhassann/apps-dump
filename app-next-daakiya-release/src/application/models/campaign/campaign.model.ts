import CampaignNotificationMeta from '@application/models/campaign/campaign.notification.meta'
import { Cohort } from '@application/services/networking/cohorts/models/cohort.model'

export enum CampaignStatus {
  INITIATED = 'INITIATED',
  CREATION_IN_PROGRESS = 'CREATION_IN_PROGRESS',
}

export default class Campaign {
 id: string
 name: string
 status: CampaignStatus
 campaignCohortIDs?: string[]
 campaignCohorts?: { cohort: Cohort }[]
 cohorts?: Cohort[]
 notificationMeta: CampaignNotificationMeta
 createdAt: Date
 updatedAt: Date

 constructor(data: Campaign) {
  this.id = data.id
  this.name = data.name
  this.status = data.status
  this.campaignCohortIDs = data.campaignCohortIDs
  this.notificationMeta = new CampaignNotificationMeta(data.notificationMeta)
  this.campaignCohorts = data.campaignCohorts?.map(({ cohort })=>({ cohort: new Cohort(cohort) }))
  this.cohorts = this.campaignCohorts?.map(({ cohort })=>cohort)
  this.createdAt = new Date(data.createdAt)
  this.updatedAt = new Date(data.updatedAt)
 }
}