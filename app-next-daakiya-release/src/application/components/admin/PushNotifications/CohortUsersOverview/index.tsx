import React from 'react'
import { Box, createStyles, Grid, Skeleton, Space, Text } from '@mantine/core'
import { useAppSelector } from '@src/application/redux/hooks'
import { LoadingState } from '@src/application/constants/enums/loading.state'
import { ICohortSliceState } from '../../../../redux/states/PushNotifications/types'

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


const CohortUsersOverview: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>()
  const { classes, cx } = useStyles()
  const { loading, cohortUserDataModel }: ICohortSliceState = useAppSelector((state) => state.pushNotification)

  // useEffect(() => {
  //   if (selectedCohorts && selectedCohorts.length>0)
  //     dispatch(listCohortsUsersCount(selectedCohorts?.map(cohort=>cohort.id)?? []) )
  // }, [dispatch, selectedCohorts])

  return (
    <>
      <Text size="xl" weight={700} style={{ marginBottom: '16px' }}>
        Cohort Overview
      </Text>
      <Grid grow gutter='lg' >
        <Grid.Col span={2}>
          <Box className={cx(classes.box)} h={80}>
            <Text size="md">
              Total Users
            </Text>
            {loading === LoadingState.OVERVIEW && <Skeleton sx={{
              display: 'inline-block',
            }} height={16} mt={12} width="20%" radius="xl" />}
            {loading !== LoadingState.OVERVIEW && (
              <Text size="xl" fw={700}>
                {cohortUserDataModel.users}
              </Text>
            )}
          </Box>
        </Grid.Col>
        <Grid.Col span={2}>
          <Box className={cx(classes.box)} h={80}>
            <Text size="md">
              Reachable Users
            </Text>
            {loading === LoadingState.OVERVIEW && <Skeleton sx={{
              display: 'inline-block',
            }} height={16} mt={12} width="20%" radius="xl" />}
            {loading !== LoadingState.OVERVIEW && (
              <Text size="xl" fw={700}>
                {cohortUserDataModel.reachable}
              </Text>
            )}

          </Box>
        </Grid.Col>
      </Grid>
      <Space h={20} />

    </>
  )
}

export default CohortUsersOverview