import axios from 'axios'
import { serviceURL } from '../../../constants'
import { CohortUsersDataModel } from './models/cohort.users.data.model'
import { CreateCohortPushNotificationModel } from './models/create.push.notification.model'
import { Cohort } from '@application/services/networking/cohorts/models/cohort.model'
import { CreateCustomPushNotificationModel } from '@application/services/networking/cohorts/models/create.custom.push.notification.model'
import { UsersTokenCountModel } from './models/users.token.count.model'
import { CampaignCreateRequestModel } from '@src/application/components/admin/PushNotifications/forms/CreatePushNotificationForm/campaign.create.response.model'
import { CampaignInitiateResponseModel } from './models/campaign.initiate.response.model'
import CampaignPagination from '@application/models/campaign/campaign.pagination'
import { Pagination } from '@application/models/shared/pagination.model'
import Campaign from '@application/models/campaign/campaign.model'
import { NotificationStats } from '@application/models/campaign/campaign.stats'

enum Request {
  COHORT,
  COHORT_USER_COUNT,
  COHORTS_USER_COUNT,
  INITIATE_CAMPAIGN,
  LIST_CAMPAIGN,
  GET_CAMPAIGN,
  GET_STATS,
  USER_COUNT,
  CREATE_COHORT_PUSH_NOTIFICATION,
  CREATE_CUSTOM_PUSH_NOTIFICATION,
}

export class CohortsManager {
   static async listCohorts(): Promise<Cohort[]> {
      const response = await axios.get<Cohort[]>(
         this.getUrl(Request.COHORT)
      )
      return response.data.map((user) => new Cohort(user))
   }

   static async createCohort(name: string): Promise<Cohort> {
      const response = await axios.post<Cohort>(
         this.getUrl(Request.COHORT),
          { name }
      )
      return new Cohort(response.data)
   }

   static async listUsersCount(): Promise<CohortUsersDataModel> {
      const response = await axios.get<UsersTokenCountModel[]>(
         this.getUrl(Request.USER_COUNT)
      )
      const users = response.data[0].count
      return new CohortUsersDataModel({ users, reachable: users })
   }

   static async listCohortUsersCount(cohortID: string): Promise<CohortUsersDataModel> {
      const response = await axios.get<CohortUsersDataModel>(
         `${this.getUrl(Request.COHORT_USER_COUNT)}/${cohortID}`
      )
      return new CohortUsersDataModel({ ...response.data })
   }

   static async listCohortsUsersCount(cohortIDs: string[]): Promise<CohortUsersDataModel> {
      const response = await axios.get<CohortUsersDataModel>(
         `${this.getUrl(Request.COHORTS_USER_COUNT)}/${JSON.stringify(cohortIDs)}`
      )
      return new CohortUsersDataModel({ ...response.data })
   }

   static async initiateCampaign(data: CampaignCreateRequestModel): Promise<CampaignInitiateResponseModel> {
      const response = await axios.post<CampaignInitiateResponseModel>(
         this.getUrl(Request.INITIATE_CAMPAIGN)
         , data
      )
      return new CampaignInitiateResponseModel({ ...response.data })
   }

   static async listCampaigns(payload: CampaignPagination): Promise<Pagination<Campaign>> {
      const url = new URL(this.getUrl(Request.LIST_CAMPAIGN))

      url.searchParams.set('pageNumber', payload.pageNumber.toString())
      url.searchParams.set('pageSize', payload.pageSize.toString())

      const response = await axios.get<Pagination<Campaign>>(url.toString())
      const items = response.data.items.map((item)=>new Campaign(item))
      return new Pagination<Campaign>({ ...response.data, items })
   }

   static async getCampaign(id: string): Promise<Campaign> {
      const url = new URL(`${this.getUrl(Request.GET_CAMPAIGN)}/${id}`)
      const response = await axios.get<Campaign>(url.toString())
      return new Campaign(response.data)
   }

   static async getStats(metaID: string): Promise<NotificationStats> {
      const url = new URL(`${this.getUrl(Request.GET_STATS)}/${metaID}`)
      const response = await axios.get<NotificationStats>(url.toString())
      return new NotificationStats(response.data)
   }

   static async bulkAddCohortUsers(file: File, cohortID: string): Promise<boolean> {
      const data = new FormData()
      data.append('file', file)
      const headers = {
         'Content-Type': 'multipart/form-data'
      }
      const response = await axios.patch(
         `${this.getUrl(Request.COHORT)}/${cohortID}`
         , data, { headers }
      )
      return response.data['success'] as boolean
   }

   static async bulkReplaceCohortUsers(file: File, cohortID: string): Promise<boolean> {
      const data = new FormData()
      data.append('file', file)
      const headers = {
         'Content-Type': 'multipart/form-data'
      }
      const response = await axios.put(
         `${this.getUrl(Request.COHORT)}/${cohortID}`
         , data, { headers }
      )
      return response.data['success'] as boolean
   }

   static async createCohortPushNotification(notification: CreateCohortPushNotificationModel): Promise<boolean> {


      const response = await axios.post(
         this.getUrl(Request.CREATE_COHORT_PUSH_NOTIFICATION)
         , notification
      )

      return true
   }

   static async createCustomPushNotification(notification: CreateCustomPushNotificationModel): Promise<boolean> {
      const response = await axios.post(
         this.getUrl(Request.CREATE_CUSTOM_PUSH_NOTIFICATION)
         , notification
      )
      return true
   }

   private static getUrl(request: Request): string {
      switch (request) {
         case Request.COHORT: {
            return `${serviceURL.daakiyaApiUrl}/cohort`
         }
         case Request.COHORT_USER_COUNT: {
            return `${serviceURL.daakiyaApiUrl}/cohort/count`
         }
         case Request.COHORTS_USER_COUNT: {
            return `${serviceURL.daakiyaApiUrl}/cohort/counts`
         }
         case Request.INITIATE_CAMPAIGN: {
            return `${serviceURL.daakiyaApiUrl}/campaign/initiate`
         }
         case Request.USER_COUNT: {
            return `${serviceURL.daakiyaApiUrl}/user/count`
         }
         case Request.CREATE_COHORT_PUSH_NOTIFICATION: {
            return `${serviceURL.daakiyaApiUrl}/notification/cohort`
         }
         case Request.CREATE_CUSTOM_PUSH_NOTIFICATION: {
            return `${serviceURL.daakiyaApiUrl}/notification/users/all`
         }
         case Request.LIST_CAMPAIGN: {
            return `${serviceURL.daakiyaApiUrl}/campaign/list`
         }
         case Request.GET_CAMPAIGN: {
            return `${serviceURL.daakiyaApiUrl}/campaign`
         }
         case Request.GET_STATS: {
            return `${serviceURL.daakiyaApiUrl}/notification/stats`
         }
         default:
            return ''
      }
   }

}
