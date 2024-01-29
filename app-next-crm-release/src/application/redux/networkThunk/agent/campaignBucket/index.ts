import { NetworkingManger } from '@/application/services/networking'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { CampaignBucketThunkType } from './types'
import { CampaignBucketCall } from '@/application/models/cohort/campaign.bucket.call.model'
import CohortCallPagination from '@/application/models/ticket/cohort.call.pagination'

export const loadBuckets = createAsyncThunk(
    CampaignBucketThunkType.loadBuckets,
    () => {
        try {
            return NetworkingManger.agent.retrieve.getCampaignBuckets()
        } catch (error) {
            console.log({ error })
        }
    }
)

export const loadBucketCalls = createAsyncThunk(
    CampaignBucketThunkType.loadBucketCalls,
    (payload: CohortCallPagination) => {
        try {
            return NetworkingManger.agent.retrieve.getCampaignBucketCalls(payload)
        } catch (error) {
            console.log({ error })
        }
    }
)

export const updateBucketCall = createAsyncThunk(
    CampaignBucketThunkType.updateBucketCall,
    (payload: Partial<CampaignBucketCall>) => {
        try {
            return NetworkingManger.agent.update.updateBucketCall(payload)
        } catch (error) {
            console.log({ error })
        }
    }
)