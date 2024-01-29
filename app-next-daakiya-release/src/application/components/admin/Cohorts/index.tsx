import { Grid, Select, Text } from '@mantine/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@application/redux'
import { ICohortSliceState } from '@application/redux/states/PushNotifications/types'
import { useAppSelector } from '@application/redux/hooks'
import {
  createCohort,
  listCohorts,
} from '@application/redux/networkThunk/PushNotifications/campaign'
import { LoadingState } from '@constants/enums/loading.state'
import ImportCohortUsersButton from '@components/admin/PushNotifications/ImportCohortUsersButton'
import { selectCohortID } from '@application/redux/states/PushNotifications/slice'

const CohortManagement = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { cohorts, loading }: ICohortSliceState = useAppSelector(
    (state) => state.pushNotification
  )

  useEffect(() => {
    dispatch(listCohorts())
  }, [dispatch])

  return (
    <>
      <Grid pl={10} pr={10}>
        <Grid.Col span={12}>
          <Text size="xl" weight={700} style={{ marginBottom: '16px' }}>
            Cohorts
          </Text>
          <Select
            placeholder="Pick one"
            data={cohorts.map((cohort) => ({
              value: cohort.id,
              label: cohort.name,
            }))}
            creatable
            getCreateLabel={(query) => (
              <p>
                <b>+ Create</b> {query}
              </p>
            )}
            shouldCreate={(query, data) =>
              // !data.length
              !!query && data.every((item) => item.label !== query)
            }
            onCreate={(query) => {
              dispatch(createCohort(query))
              return undefined
            }}
            disabled={loading === LoadingState.CREATE_COHORT}
            onChange={(id) => dispatch(selectCohortID(id))}
            clearable
            style={{ marginBottom: '16px' }}
            label="Cohorts"
            searchable
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <ImportCohortUsersButton title="Add Users" />
        </Grid.Col>
        <Grid.Col span={12}>
          <ImportCohortUsersButton
            title="Replace Users"
            replace={true}
            color="blue"
          />
        </Grid.Col>
      </Grid>
    </>
  )
}

export default CohortManagement
