import { Button, Flex, Text } from '@mantine/core'
import { setCampaignUI } from '@application/redux/states/PushNotifications/slice'
import { CampaignUI } from '@constants/enums/campaign.ui'
import React, { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@application/redux'
import { ICohortSliceState } from '../../../../redux/states/PushNotifications/types'
import { useAppSelector } from '@application/redux/hooks'
import Campaign from '@application/models/campaign/campaign.model'
import PaginatedTable, {
  PaginatedTableProps,
} from '@components/core/PaginatedTable'
import {
  getCampaign,
  listCampaigns,
} from '@application/redux/networkThunk/PushNotifications/campaign'
import { DEFAULT_PAGE_SIZE } from '@constants/index'
import date from 'date-and-time'

const Campaigns = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { campaigns }: ICohortSliceState = useAppSelector(
    (state) => state.pushNotification
  )

  const onRowClick = useCallback(
    (campaign: Campaign) => {
      dispatch(setCampaignUI(CampaignUI.VIEW))

      dispatch(getCampaign(campaign.id))
      // .unwrap()
      // .then(() => {
      //     if (campaign.notificationMeta.id)
      //         dispatch(getStats(campaign.notificationMeta.id))
      // })
    },
    [dispatch]
  )

  const campaignTableList = useMemo<PaginatedTableProps<Campaign>>(
    () => ({
      columns: ['Name', 'Status', 'Created At'],
      data: campaigns,
      render: (campaign) => {
        return (
          <tr
            key={campaign.id}
            className="pointer"
            onClick={() => {
              onRowClick(campaign)
            }}
          >
            <td>{campaign.name}</td>
            <td>{campaign.status.replace(/_/gi, ' ')}</td>
            <td>{date.format(campaign.createdAt, 'DD-MM-YYYY HH:mm:ss')}</td>
          </tr>
        )
      },
      onPageChange: (pageNumber) => {
        dispatch(listCampaigns({ pageNumber, pageSize: DEFAULT_PAGE_SIZE }))
      },
    }),
    [campaigns, dispatch, onRowClick]
  )
  return (
    <div>
      <Flex
        mih={50}
        gap="md"
        justify="flex-end"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Button
          sx={{ marginRight: '5px' }}
          color="yellow"
          variant="outline"
          onClick={() => dispatch(setCampaignUI(CampaignUI.CREATE))}
        >
          Create Campaign
        </Button>
      </Flex>

      <Text size="xl" weight={700} style={{ marginBottom: '16px' }}>
        Campaigns
      </Text>
      <PaginatedTable {...campaignTableList} />
    </div>
  )
}

export default Campaigns