import { Button, Flex, Grid, Space } from '@mantine/core'

import React, { useEffect } from 'react'
import CreatePushNotificationForm from './forms/CreatePushNotificationForm'
import CohortUsersOverview from './CohortUsersOverview'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@application/redux'
import { listCohorts } from '../../../redux/networkThunk/PushNotifications/campaign'
import { ICohortSliceState } from '../../../redux/states/PushNotifications/types'
import { useAppSelector } from '@src/application/redux/hooks'
import { LoadingState } from '@src/application/constants/enums/loading.state'
import { setCampaignUI } from '@application/redux/states/PushNotifications/slice'
import { CampaignUI } from '@constants/enums/campaign.ui'

export default function PushNotifications() {
  const dispatch = useDispatch<AppDispatch>()

  const { loading }: ICohortSliceState = useAppSelector(
    (state) => state.pushNotification
  )

  useEffect(() => {
    dispatch(listCohorts())
  }, [dispatch])
  return (
    <>
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
          disabled={loading === LoadingState.CREATE_CAMPAIGN}
          onClick={() => dispatch(setCampaignUI(CampaignUI.LIST))}
        >
          Back to Campaign List
        </Button>

        {/*<ImportCohortUsersButton />*/}
      </Flex>
      <Space h="xl" />
      <Grid pl={10} pr={10}>
        <Grid.Col span={7}>
          <CreatePushNotificationForm />
        </Grid.Col>
        <Grid.Col span={5}>
          <CohortUsersOverview />
        </Grid.Col>
      </Grid>
    </>
  )
}