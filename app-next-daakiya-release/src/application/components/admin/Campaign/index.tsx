import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@application/redux'
import { listCampaigns } from '../../../redux/networkThunk/PushNotifications/campaign'
import PushNotifications from '../PushNotifications'
import { TExistingCampaignList } from './models/campaign.existing.list.model'
import CampaignStats from './CampaignStats'
import { CampaignUI } from '@constants/enums/campaign.ui'
import { ICohortSliceState } from '../../../redux/states/PushNotifications/types'
import { useAppSelector } from '@application/redux/hooks'
import Campaigns from '@components/admin/Campaign/Campaigns'
import { DEFAULT_PAGE_SIZE } from '@constants/index'

const dummyData: TExistingCampaignList[] = [
  { title: 'Chaye piyoge?', cohort: 'Paid Users', date: '16/05/2023' },
  { title: 'Paisa laya?', cohort: 'Unpaid Users', date: '19/06/2023' },
]

export default function CampaignCreation() {
  const dispatch = useDispatch<AppDispatch>()

  const { campaignUI }: ICohortSliceState = useAppSelector(
    (state) => state.pushNotification
  )

  useEffect(() => {
    dispatch(listCampaigns({ pageNumber: 1, pageSize: DEFAULT_PAGE_SIZE }))
  }, [dispatch])

  if (campaignUI === CampaignUI.LIST) {
    return (
        <Campaigns />
    )
  }

  if (campaignUI === CampaignUI.CREATE) 
    return <PushNotifications />
  

  if (campaignUI === CampaignUI.VIEW) 
    return <CampaignStats />

  return <>Nothing</>
  
}
