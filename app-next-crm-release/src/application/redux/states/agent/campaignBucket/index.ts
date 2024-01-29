import { CampaignBucketCall } from '@/application/models/cohort/campaign.bucket.call.model'
import { CampaignBucket } from '@/application/models/cohort/campaign.bucket.model'
import { loadBucketCalls, loadBuckets, updateBucketCall } from '@/application/redux/networkThunk/agent/campaignBucket'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { defaultState, } from './types'
import { Pagination } from '@/application/models/shared/pagination.model'
import { DEFAULT_PAGE_SIZE } from '@/application/constants'
import { CallStatus } from '@/application/constants/enums/callStatus'

export const campaignBucketSlice = createSlice({
    name: 'campaignBucket',
    initialState: defaultState,
    reducers: {
        setBucket: (state, action: PayloadAction<string>) => {
            state.bucket = state.buckets?.find((item) => item.id === action.payload)
        },

        updateBucketList: (state, action: PayloadAction<string>) => {
            console.log({ action })
            const index = state.calls.items.findIndex(call => call?.id === action.payload)
            console.log({ index })
            if (state?.calls?.items?.[index]?.status)
                state.calls.items[index].status = CallStatus.IN_PROGRESS
            state.calls = new Pagination<CampaignBucketCall>({ ...state.calls, items: state.calls.items })
        },

        completeBucketList: (state, action: PayloadAction<string>) => {
            console.log({ action })
            const index = state.calls.items.findIndex(call => call?.id === action.payload)
            console.log({ index })
            state.calls.items[index].status = CallStatus.COMPLETED
            state.calls = new Pagination<CampaignBucketCall>({ ...state.calls, items: state.calls.items })
        },
    },
    extraReducers: (builder) => {
        // MARK:- Load Buckets
        builder.addCase(loadBuckets.pending, (state,) => {
            state.isLoading = true
        })

        builder.addCase(loadBuckets.fulfilled, (state, action) => {
            console.log({ action })

            state.buckets = action.payload?.map((item: CampaignBucket) => new CampaignBucket(item)) ?? []
            state.bucket = state.buckets?.[0]
            state.isLoading = false
        })

        builder.addCase(loadBuckets.rejected, (state, action: PayloadAction<any>) => {
            console.log({ action })
            state.isLoading = false
        })

        // MARK:- Load Bucket Calls
        builder.addCase(loadBucketCalls.pending, (state,) => {
            state.isLoading = true
        })

        builder.addCase(loadBucketCalls.fulfilled, (state, action) => {
            console.log({ action })

            state.calls = action.payload ?? new Pagination<CampaignBucketCall>({
                count: 0,
                pageSize: DEFAULT_PAGE_SIZE,
                totalPages: 0,
                pageNumber: 1,
                items: [],
            })
            state.isLoading = false
        })

        builder.addCase(loadBucketCalls.rejected, (state, action: PayloadAction<any>) => {
            console.log({ action })
            state.isLoading = false
        })

        // MARK:- Update Bucket Call
        builder.addCase(updateBucketCall.pending, (state,) => {
            // state.isLoading = true
        })

        builder.addCase(updateBucketCall.fulfilled, (state, action: PayloadAction<any>) => {
            console.log({ action })

            state.calls = new Pagination<CampaignBucketCall>({
                ...state.calls,
                items: state.calls.items.map((item) => item.id === action.payload.id ? new CampaignBucketCall(action.payload) : item)
            })
        })

        builder.addCase(updateBucketCall.rejected, (state, action: PayloadAction<any>) => {
            console.log({ action })
            // state.isLoading = false
        })
    },
})

export const { setBucket, updateBucketList, completeBucketList } = campaignBucketSlice.actions

export default campaignBucketSlice.reducer 