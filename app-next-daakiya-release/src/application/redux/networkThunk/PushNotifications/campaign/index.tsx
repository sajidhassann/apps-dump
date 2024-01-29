import { createAsyncThunk } from '@reduxjs/toolkit'
import { CohortsManager } from '@src/application/services/networking/cohorts'
import { CohortThunkType } from './types'
import { BulkCohortUsersModel } from '@application/services/networking/cohorts/models/bulk.cohort.users.model'
import { CreateCohortPushNotificationModel } from '@src/application/services/networking/cohorts/models/create.push.notification.model'
import { CreateCustomPushNotificationModel } from '@application/services/networking/cohorts/models/create.custom.push.notification.model'
import { CampaignCreateRequestModel } from '@src/application/components/admin/PushNotifications/forms/CreatePushNotificationForm/campaign.create.response.model'
import CampaignPagination from '@application/models/campaign/campaign.pagination'

export const listCohortUsersCount = createAsyncThunk(
  CohortThunkType.listCohortUsersCount,
  async (cohortID: string) => {
    const response = await CohortsManager.listCohortUsersCount(cohortID)
    return response
  }
)

export const listCohortsUsersCount = createAsyncThunk(
    CohortThunkType.listCohortsUsersCount,
    async (cohortIDs: string[]) => {
        const response = await CohortsManager.listCohortsUsersCount(cohortIDs)
        return response
    }
)

export const listUsersCount = createAsyncThunk(
    CohortThunkType.listUsers,
    async () => {
        const response = await CohortsManager.listUsersCount()
        return response
    }
)
export const listCohorts = createAsyncThunk(
    CohortThunkType.listCohorts,
    async () => {
        const response = await CohortsManager.listCohorts()
        return response
    }
)
export const createCohort = createAsyncThunk(
    CohortThunkType.createCohort,
    (name: string) => {
        return CohortsManager.createCohort(name)
    }
)
export const listCampaigns = createAsyncThunk(
    CohortThunkType.listCampaigns,
    (payload: CampaignPagination) => {
        return CohortsManager.listCampaigns(payload)
    }
)
export const getCampaign = createAsyncThunk(
    CohortThunkType.getCampaign,
    async (id: string) => {
        try {
            return await CohortsManager.getCampaign(id)
        }
        catch (e: any) {
            throw new Error(e.response?.data['message'])
        }
    }
)

export const getStats = createAsyncThunk(
    CohortThunkType.getStats,
    async (metaID: string) => {
        try {
            return await CohortsManager.getStats(metaID)
        }
        catch (e: any) {
            throw new Error(e.response?.data['message'])
        }
    }
)

export const initiateCampaign = createAsyncThunk(
    CohortThunkType.initiateCampaign,
    async (data: CampaignCreateRequestModel) => {
        try {
        const response = await CohortsManager.initiateCampaign(data)
        }
        catch (e: any) {
            throw new Error(e.response?.data['message'])
        }
    }
)

export const bulkAddCohortUsers = createAsyncThunk(
    CohortThunkType.bulkAddCohortUsers,
    async (data: BulkCohortUsersModel) => {
        try {
            const response = await CohortsManager.bulkAddCohortUsers(data.file, data.cohortID)
        }
        catch (e: any) {
            throw new Error(e.response?.data['message'])
        }
    }
)

export const bulkReplaceCohortUsers = createAsyncThunk(
    CohortThunkType.bulkReplaceCohortUsers,
    async (data: BulkCohortUsersModel) => {
        try {
            const response = await CohortsManager.bulkReplaceCohortUsers(data.file, data.cohortID)
        }
        catch (e: any) {
            throw new Error(e.response?.data['message'])
        }
    }
)


export const createCohortPushNotification = createAsyncThunk(
    CohortThunkType.createCohortPushNotification,
    async (data: CreateCohortPushNotificationModel) => {
        try {
            const response = await CohortsManager.createCohortPushNotification(data)
        }
        catch (e: any) {
            throw new Error(e.response?.data['message'])
        }
    }
)


export const createCustomPushNotification = createAsyncThunk(
    CohortThunkType.createCustomPushNotification,
    async (data: CreateCustomPushNotificationModel) => {
        try {
            const response = await CohortsManager.createCustomPushNotification(data)
        }
        catch (e: any) {
            throw new Error(e.response?.data['message'])
        }
    }
)