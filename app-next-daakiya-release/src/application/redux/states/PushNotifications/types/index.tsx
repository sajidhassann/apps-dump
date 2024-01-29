import { LoadingState } from '@constants/enums/loading.state'
import { Cohort } from '@application/services/networking/cohorts/models/cohort.model'
import { CohortUsersDataModel } from '@application/services/networking/cohorts/models/cohort.users.data.model'
import { CampaignUI } from '@constants/enums/campaign.ui'
import { Pagination } from '@application/models/shared/pagination.model'
import Campaign from '@application/models/campaign/campaign.model'
import { DEFAULT_PAGE_SIZE } from '@constants/index'
import { NotificationStats } from '@application/models/campaign/campaign.stats'

export interface ICohortSliceState {
  loading: LoadingState;
  currentCampaign?: Campaign;
  stats?: NotificationStats;
  cohorts: Cohort[];
  campaigns: Pagination<Campaign>;
  currentCohort?: Cohort;
  currentCohortID: string | null;
  selectedCohorts?: Cohort[];
  campaignUI: CampaignUI;
  cohortUserDataModel: CohortUsersDataModel;
}

export const defaultState: ICohortSliceState = {
    loading: LoadingState.DEFAULT,
    campaignUI: CampaignUI.LIST,
    cohorts: [],
    cohortUserDataModel: new CohortUsersDataModel({ users: 0, reachable: 0 }),
    campaigns: new Pagination<Campaign>({
        count: 0,
        pageSize: DEFAULT_PAGE_SIZE,
        totalPages: 0,
        pageNumber: 1,
        items: [],
    }),
    currentCohortID: null
}
