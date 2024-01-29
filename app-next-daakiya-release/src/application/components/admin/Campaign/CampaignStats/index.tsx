import {
  Box,
  Button,
  createStyles,
  Flex,
  Grid,
  MultiSelect,
  Skeleton,
  Space,
  Text,
  TextInput,
} from '@mantine/core'
import React, { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@application/redux'
import { setCampaignUI } from '@application/redux/states/PushNotifications/slice'
import { CampaignUI } from '@constants/enums/campaign.ui'
import { ICohortSliceState } from '@src/application/redux/states/PushNotifications/types'
import { useAppSelector } from '@src/application/redux/hooks'
import { LoadingState } from '@src/application/constants/enums/loading.state'
import { getStats } from '@application/redux/networkThunk/PushNotifications/campaign'

const useStyles = createStyles((theme) => ({
  box: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
    textAlign: 'center',
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
    alignContent: 'center',
  },
}))

export default function CampaignStats() {
  const { classes, cx } = useStyles()
  const dispatch = useDispatch<AppDispatch>()
  const { currentCampaign, loading, stats }: ICohortSliceState = useAppSelector(
    (state) => state.pushNotification
  )

  useEffect(() => {
    if (currentCampaign?.notificationMeta.id)
      dispatch(getStats(currentCampaign.notificationMeta.id))
  }, [currentCampaign?.notificationMeta.id, dispatch])

  const cohortList = useMemo(
    () =>
      currentCampaign?.cohorts?.map((cohort) => ({
        label: cohort.name,
        value: cohort.id,
      })) ?? [],
    [currentCampaign?.cohorts]
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
          onClick={() => dispatch(setCampaignUI(CampaignUI.LIST))}
        >
          Back to Campaign List
        </Button>
      </Flex>
      <Text size="xl" weight={700} style={{ marginBottom: '16px' }}>
        {currentCampaign?.name}
        <Text size="md" weight={500} color="blue">
          ({currentCampaign?.status?.replace(/_/g, ' ')})
        </Text>
      </Text>
      <Grid style={{ marginBottom: '16px' }}>
        <Grid.Col span={6}>
          <TextInput
            label="PN Title"
            value={currentCampaign?.notificationMeta.title}
            style={{ marginBottom: '16px' }}
          />
          <TextInput
            label="Deep Link"
            value={currentCampaign?.notificationMeta.link}
          />
        </Grid.Col>

        <Grid.Col span={6} h={200}>
          <TextInput
            label="Body"
            style={{ marginBottom: '16px' }}
            value={currentCampaign?.notificationMeta.body}
          />
          <MultiSelect
            placeholder="Pick one"
            data={cohortList}
            label="Cohorts"
            value={currentCampaign?.cohorts?.map((cohort) => cohort.id)}
          />
        </Grid.Col>
      </Grid>

      <Text size="xl" weight={700} style={{ marginBottom: '16px' }}>
        Analytics
      </Text>
      <Text size="md" weight={600} style={{ marginBottom: '16px' }}>
        Count
      </Text>
      <Grid>
        <Grid.Col span={2}>
          <Box className={cx(classes.box)} h={80}>
            <Text size="md">Total</Text>
            {loading === LoadingState.GET_CAMPAIGN_STATS && (
              <Skeleton
                sx={{
                  display: 'inline-block',
                }}
                height={16}
                mt={12}
                width="20%"
                radius="xl"
              />
            )}
            {loading !== LoadingState.GET_CAMPAIGN_STATS && (
              <Text size="xl" fw={700}>
                {stats?.totalUsers}
              </Text>
            )}
          </Box>
        </Grid.Col>
        <Grid.Col span={2}>
          <Box className={cx(classes.box)} h={80}>
            <Text size="md">Failed</Text>
            {loading === LoadingState.GET_CAMPAIGN_STATS && (
              <Skeleton
                sx={{
                  display: 'inline-block',
                }}
                height={16}
                mt={12}
                width="20%"
                radius="xl"
              />
            )}
            {loading !== LoadingState.GET_CAMPAIGN_STATS && (
              <Text size="xl" fw={700}>
                {stats?.totalFailed}
              </Text>
            )}
          </Box>
        </Grid.Col>
        <Grid.Col span={2}>
          <Box className={cx(classes.box)} h={80}>
            <Text size="md">Delivered</Text>
            {loading === LoadingState.GET_CAMPAIGN_STATS && (
              <Skeleton
                sx={{
                  display: 'inline-block',
                }}
                height={16}
                mt={12}
                width="20%"
                radius="xl"
              />
            )}
            {loading !== LoadingState.GET_CAMPAIGN_STATS && (
              <Text size="xl" fw={700}>
                {stats?.totalDelivered}
              </Text>
            )}
          </Box>
        </Grid.Col>
        <Grid.Col span={2}>
          <Box className={cx(classes.box)} h={80}>
            <Text size="md">Received</Text>
            {loading === LoadingState.GET_CAMPAIGN_STATS && (
              <Skeleton
                sx={{
                  display: 'inline-block',
                }}
                height={16}
                mt={12}
                width="20%"
                radius="xl"
              />
            )}
            {loading !== LoadingState.GET_CAMPAIGN_STATS && (
              <Text size="xl" fw={700}>
                {stats?.totalReceived}
              </Text>
            )}
          </Box>
        </Grid.Col>
        <Grid.Col span={2}>
          <Box className={cx(classes.box)} h={80}>
            <Text size="md">Opened</Text>
            {loading === LoadingState.GET_CAMPAIGN_STATS && (
              <Skeleton
                sx={{
                  display: 'inline-block',
                }}
                height={16}
                mt={12}
                width="20%"
                radius="xl"
              />
            )}
            {loading !== LoadingState.GET_CAMPAIGN_STATS && (
              <Text size="xl" fw={700}>
                {stats?.totalOpened}
              </Text>
            )}
          </Box>
        </Grid.Col>
      </Grid>
      <Space h={20} />
      <Text size="md" weight={600} style={{ marginBottom: '16px' }}>
        Percentage
      </Text>
      <Grid>
        <Grid.Col span={2}>
          <Box className={cx(classes.box)} h={80}>
            <Text size="md">Failed</Text>
            {loading === LoadingState.GET_CAMPAIGN_STATS && (
              <Skeleton
                sx={{
                  display: 'inline-block',
                }}
                height={16}
                mt={12}
                width="20%"
                radius="xl"
              />
            )}
            {loading !== LoadingState.GET_CAMPAIGN_STATS && (
              <Text size="xl" fw={700}>
                {stats?.totalFailedPercentage}%
              </Text>
            )}
          </Box>
        </Grid.Col>
        <Grid.Col span={2}>
          <Box className={cx(classes.box)} h={80}>
            <Text size="md">Delivered</Text>
            {loading === LoadingState.GET_CAMPAIGN_STATS && (
              <Skeleton
                sx={{
                  display: 'inline-block',
                }}
                height={16}
                mt={12}
                width="20%"
                radius="xl"
              />
            )}
            {loading !== LoadingState.GET_CAMPAIGN_STATS && (
              <Text size="xl" fw={700}>
                {stats?.totalDeliveredPercentage}%
              </Text>
            )}
          </Box>
        </Grid.Col>
        <Grid.Col span={2}>
          <Box className={cx(classes.box)} h={80}>
            <Text size="md">Received</Text>
            {loading === LoadingState.GET_CAMPAIGN_STATS && (
              <Skeleton
                sx={{
                  display: 'inline-block',
                }}
                height={16}
                mt={12}
                width="20%"
                radius="xl"
              />
            )}
            {loading !== LoadingState.GET_CAMPAIGN_STATS && (
              <Text size="xl" fw={700}>
                {stats?.totalReceivedPercentage}%
              </Text>
            )}
          </Box>
        </Grid.Col>
        <Grid.Col span={2}>
          <Box className={cx(classes.box)} h={80}>
            <Text size="md">Opened</Text>
            {loading === LoadingState.GET_CAMPAIGN_STATS && (
              <Skeleton
                sx={{
                  display: 'inline-block',
                }}
                height={16}
                mt={12}
                width="20%"
                radius="xl"
              />
            )}
            {loading !== LoadingState.GET_CAMPAIGN_STATS && (
              <Text size="xl" fw={700}>
                {stats?.totalOpenedPercentage}%
              </Text>
            )}
          </Box>
        </Grid.Col>
      </Grid>
    </div>
  )
}
