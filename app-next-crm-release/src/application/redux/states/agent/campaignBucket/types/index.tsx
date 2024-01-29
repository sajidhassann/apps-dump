import { CampaignBucket } from '@/application/models/cohort/campaign.bucket.model'
import { CampaignBucketCall } from '@/application/models/cohort/campaign.bucket.call.model'
import { Pagination } from '@/application/models/shared/pagination.model'
import { DEFAULT_PAGE_SIZE } from '@/application/constants'

export interface ICampaignBucketState {
    socket?: any
    buckets: CampaignBucket[]
    bucket?: CampaignBucket
    calls: Pagination<CampaignBucketCall>
    call?: CampaignBucketCall
    isLoading: boolean
}

export const defaultState: ICampaignBucketState = {
    buckets: [],
    calls: new Pagination<CampaignBucketCall>({
        count: 0,
        pageSize: DEFAULT_PAGE_SIZE,
        totalPages: 0,
        pageNumber: 1,
        items: [],
    }),
    isLoading: false,
    socket: null
}