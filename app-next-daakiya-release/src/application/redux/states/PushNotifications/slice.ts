import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NotificationType, Notify } from '@components/core/Notification'

import { LoadingState } from '@constants/enums/loading.state'
import { defaultState } from './types'
import {
  bulkAddCohortUsers,
  bulkReplaceCohortUsers,
  createCohort,
  createCohortPushNotification,
  createCustomPushNotification,
  getCampaign,
  getStats,
  initiateCampaign,
  listCampaigns,
  listCohorts,
  listCohortsUsersCount,
  listCohortUsersCount,
  listUsersCount,
} from '../../networkThunk/PushNotifications/campaign'
import { CohortUsersDataModel } from '@application/services/networking/cohorts/models/cohort.users.data.model'
import { DEFAULT_PAGE_SIZE, GENERIC_ERROR_MESSAGE } from '@constants/index'
import { Cohort } from '@application/services/networking/cohorts/models/cohort.model'
import { CampaignUI } from '@constants/enums/campaign.ui'
import { Pagination } from '@application/models/shared/pagination.model'
import Campaign from '@application/models/campaign/campaign.model'

export const PushNotificationSlice = createSlice({
  name: 'PushNotificationSlice',
  initialState: defaultState,
  reducers: {
    selectCohort: (state, action: PayloadAction<Cohort>) => {
      state.currentCohort = action.payload
    },

    selectCohortID: (state, action: PayloadAction<string | null>) => {
      state.currentCohortID = action.payload
    },

    setCampaignUI: (state, action: PayloadAction<CampaignUI>) => {
      state.campaignUI = action.payload
    },

    selectCohorts: (state, action: PayloadAction<Cohort[]>) => {
      state.selectedCohorts = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listCohortUsersCount.pending, (state) => {
      state.loading = LoadingState.OVERVIEW
      state.cohortUserDataModel = state.cohortUserDataModel ?? {}
    })

    builder.addCase(listCohortUsersCount.rejected, (state) => {
      state.loading = LoadingState.DEFAULT
      state.cohortUserDataModel = state.cohortUserDataModel ?? {}
      Notify({
        title: 'Error',
        message: 'Unable to get cohort users',
        type: NotificationType.ERROR,
      })
    })

    builder.addCase(
      listCohortUsersCount.fulfilled,
      (state, action: PayloadAction<CohortUsersDataModel>) => {
        state.loading = LoadingState.DEFAULT
        state.cohortUserDataModel = action.payload
      }
    )

    builder.addCase(listCohortsUsersCount.pending, (state) => {
      state.loading = LoadingState.OVERVIEW
      state.cohortUserDataModel = state.cohortUserDataModel ?? {}
    })

    builder.addCase(listCohortsUsersCount.rejected, (state) => {
      state.loading = LoadingState.DEFAULT
      state.cohortUserDataModel = state.cohortUserDataModel ?? {}
      Notify({
        title: 'Error',
        message: 'Unable to get cohort users',
        type: NotificationType.ERROR,
      })
    })

    builder.addCase(
      listCohortsUsersCount.fulfilled,
      (state, action: PayloadAction<CohortUsersDataModel>) => {
        state.loading = LoadingState.DEFAULT
        state.cohortUserDataModel = action.payload
      }
    )

    builder.addCase(listUsersCount.pending, (state) => {
      state.loading = LoadingState.OVERVIEW
      state.cohortUserDataModel = state.cohortUserDataModel ?? {}
    })

    builder.addCase(listUsersCount.rejected, (state) => {
      state.loading = LoadingState.DEFAULT
      state.cohortUserDataModel = state.cohortUserDataModel ?? {}
      Notify({
        title: 'Error',
        message: 'Unable to get users',
        type: NotificationType.ERROR,
      })
    })

    builder.addCase(
      listUsersCount.fulfilled,
      (state, action: PayloadAction<CohortUsersDataModel>) => {
        state.loading = LoadingState.DEFAULT
        state.cohortUserDataModel = action.payload
      }
    )

    builder.addCase(listCohorts.pending, (state) => {
      state.loading = LoadingState.LIST_COHORT
      state.cohorts = []
    })

    builder.addCase(listCohorts.rejected, (state) => {
      state.loading = LoadingState.DEFAULT
      state.cohorts = []
      Notify({
        title: 'Error',
        message: 'Unable to get cohorts',
        type: NotificationType.ERROR,
      })
    })

    builder.addCase(listCohorts.fulfilled, (state, action) => {
      state.loading = LoadingState.DEFAULT
      state.cohorts = action.payload
    })

    builder.addCase(createCohort.pending, (state) => {
      state.loading = LoadingState.CREATE_COHORT
    })

    builder.addCase(createCohort.rejected, (state) => {
      state.loading = LoadingState.DEFAULT
      Notify({
        title: 'Error',
        message: 'Unable to create cohort',
        type: NotificationType.ERROR,
      })
    })

    builder.addCase(createCohort.fulfilled, (state, action) => {
      state.loading = LoadingState.DEFAULT
      state.cohorts.unshift(action.payload)
    })

    builder.addCase(listCampaigns.pending, (state) => {
      state.loading = LoadingState.LIST_COHORT
    })

    builder.addCase(listCampaigns.rejected, (state) => {
      state.loading = LoadingState.DEFAULT
      state.campaigns = new Pagination<Campaign>({
        count: 0,
        pageSize: DEFAULT_PAGE_SIZE,
        totalPages: 0,
        pageNumber: 1,
        items: [],
      })
      Notify({
        title: 'Error',
        message: 'Unable to get campaigns',
        type: NotificationType.ERROR,
      })
    })

    builder.addCase(listCampaigns.fulfilled, (state, action) => {
      state.loading = LoadingState.DEFAULT
      state.campaigns = action.payload
    })

    builder.addCase(getCampaign.pending, (state) => {
      state.loading = LoadingState.GET_CAMPAIGN
    })

    builder.addCase(getCampaign.rejected, (state, action) => {
      state.loading = LoadingState.DEFAULT
      Notify({
        title: 'Error',
        message: action.error.message ?? GENERIC_ERROR_MESSAGE,
        type: NotificationType.ERROR,
      })
    })

    builder.addCase(getCampaign.fulfilled, (state, action) => {
      state.loading = LoadingState.DEFAULT
      state.currentCampaign = action.payload
    })

    builder.addCase(getStats.pending, (state) => {
      state.loading = LoadingState.GET_CAMPAIGN_STATS
    })

    builder.addCase(getStats.rejected, (state, action) => {
      state.loading = LoadingState.DEFAULT
      Notify({
        title: 'Error',
        message: action.error.message ?? GENERIC_ERROR_MESSAGE,
        type: NotificationType.ERROR,
      })
    })

    builder.addCase(getStats.fulfilled, (state, action) => {
      state.loading = LoadingState.DEFAULT
      state.stats = action.payload
    })

    builder.addCase(bulkAddCohortUsers.pending, (state) => {
      state.loading = LoadingState.UPDATE
    })

    builder.addCase(bulkAddCohortUsers.rejected, (state, action) => {
      state.loading = LoadingState.DEFAULT
      Notify({
        title: 'Error',
        message: action.error.message ?? GENERIC_ERROR_MESSAGE,
        type: NotificationType.ERROR,
      })
    })

    builder.addCase(bulkAddCohortUsers.fulfilled, (state, action) => {
      state.loading = LoadingState.DEFAULT
      Notify({
        title: 'Uploaded Successfully',
        message: 'Users added to cohort',
        type: NotificationType.SUCCESS,
      })
    })

    builder.addCase(bulkReplaceCohortUsers.pending, (state) => {
      state.loading = LoadingState.UPDATE
    })

    builder.addCase(bulkReplaceCohortUsers.rejected, (state, action) => {
      state.loading = LoadingState.DEFAULT
      Notify({
        title: 'Error',
        message: action.error.message ?? GENERIC_ERROR_MESSAGE,
        type: NotificationType.ERROR,
      })
    })

    builder.addCase(bulkReplaceCohortUsers.fulfilled, (state, action) => {
      state.loading = LoadingState.DEFAULT
      Notify({
        title: 'Replaced Successfully',
        message: 'Users added to cohort',
        type: NotificationType.SUCCESS,
      })
    })

    builder.addCase(initiateCampaign.fulfilled, (state) => {
      state.loading = LoadingState.DEFAULT
      state.campaignUI = CampaignUI.LIST
      Notify({
        title: 'Success',
        message: 'Campaign Created',
        type: NotificationType.SUCCESS,
      })
    })

    builder.addCase(initiateCampaign.pending, (state) => {
      state.loading = LoadingState.CREATE_CAMPAIGN
    })

    builder.addCase(initiateCampaign.rejected, (state, action) => {
      state.loading = LoadingState.DEFAULT
      Notify({
        title: 'Error',
        message: action.error.message ?? GENERIC_ERROR_MESSAGE,
        type: NotificationType.ERROR,
      })
    })

    builder.addCase(createCohortPushNotification.pending, (state) => {
      state.loading = LoadingState.CREATE_PUSH_NOTIFICATION
    })

    builder.addCase(createCohortPushNotification.rejected, (state, action) => {
      state.loading = LoadingState.DEFAULT
      Notify({
        title: 'Error',
        message: action.error.message ?? GENERIC_ERROR_MESSAGE,
        type: NotificationType.ERROR,
      })
    })

    builder.addCase(createCohortPushNotification.fulfilled, (state) => {
      state.loading = LoadingState.DEFAULT
      Notify({
        title: 'Success',
        message: 'Notifications sent successfully',
        type: NotificationType.SUCCESS,
      })
    })

    builder.addCase(createCustomPushNotification.pending, (state) => {
      state.loading = LoadingState.CREATE_PUSH_NOTIFICATION
    })

    builder.addCase(createCustomPushNotification.rejected, (state, action) => {
      state.loading = LoadingState.DEFAULT
      Notify({
        title: 'Error',
        message: action.error.message ?? GENERIC_ERROR_MESSAGE,
        type: NotificationType.ERROR,
      })
    })

    builder.addCase(createCustomPushNotification.fulfilled, (state) => {
      state.loading = LoadingState.DEFAULT
      Notify({
        title: 'Success',
        message: 'Notifications sent successfully',
        type: NotificationType.SUCCESS,
      })
    })
  },
})

export const { selectCohort, selectCohortID, selectCohorts, setCampaignUI } =
  PushNotificationSlice.actions

export default PushNotificationSlice.reducer
