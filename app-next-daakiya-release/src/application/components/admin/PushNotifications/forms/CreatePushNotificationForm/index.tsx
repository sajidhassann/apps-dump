// components/LeftComponent.js
import React, { useCallback, useMemo } from 'react'
import {
  Button,
  Divider,
  MultiSelect,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { AppDispatch } from '@src/application/redux'
import { useDispatch } from 'react-redux'
import {
  initiateCampaign,
  listCohortsUsersCount,
} from '../../../../../redux/networkThunk/PushNotifications/campaign'
import { useAppSelector } from '@src/application/redux/hooks'
import { LoadingState } from '@src/application/constants/enums/loading.state'
import { ICohortSliceState } from '../../../../../redux/states/PushNotifications/types'
import { CampaignCreateRequestModel } from './campaign.create.response.model'

const CreatePushNotificationForm = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { cohorts, campaignUI, loading }: ICohortSliceState = useAppSelector(
    (state) => state.pushNotification
  )

  const form = useForm({
    initialValues: {
      campaignName: '',
      title: '',
      body: '',
      cohorts: [],
      link: '',
    },
  })

  const handleOnSubmit = useCallback(
    async (values: typeof form.values) => {
      const data: CampaignCreateRequestModel = {
        name: values.campaignName,
        campaignCohortIDs: values.cohorts,
        notificationMeta: {
          title: values.title,
          body: values.body,
          link: values.link,
        },
      }
      await dispatch(initiateCampaign(data))
    },
    [form, dispatch]
  )

  const cohortList = useMemo(
    () => cohorts.map((cohort) => ({ label: cohort.name, value: cohort.id })),
    [cohorts]
  )

  const getCohortsUsersCount = useCallback(() => {
    if (form.values.cohorts.length > 0)
      dispatch(listCohortsUsersCount(form.values.cohorts ?? []))
  }, [dispatch, form.values.cohorts])

  return (
    <>
      <form onSubmit={form.onSubmit(handleOnSubmit)}>
        <Text size="xl" weight={700} style={{ marginBottom: '16px' }}>
          Create Campaign
        </Text>
        <TextInput
          withAsterisk
          required
          label="Campaign Name"
          placeholder="Enter Campaign Name"
          style={{ marginBottom: '16px' }}
          {...form.getInputProps('campaignName')}
        />
        <Divider />
        <br />
        <MultiSelect
          placeholder="Pick one"
          data={cohortList}
          clearable
          style={{ marginBottom: '16px' }}
          {...form.getInputProps('cohorts')}
          label="Cohorts"
          searchable
        />
        <Button
          onClick={getCohortsUsersCount}
          fullWidth
          className="bg-blue-300"
          color="blue"
        >
          Get Overview
        </Button>
        <br />
        <Divider />
        <br />

        <TextInput
          withAsterisk
          required
          label="PN Title"
          placeholder="Maqsad App ko bhool gaye ho? 😪"
          style={{ marginBottom: '16px' }}
          {...form.getInputProps('title')}
        />

        <Textarea
          label="Body"
          withAsterisk
          required
          placeholder="Enter body..."
          style={{ marginBottom: '16px' }}
          {...form.getInputProps('body')}
        />

        <TextInput
          label="Deep Link"
          placeholder="myapp://path/to/page?pageid=1"
          style={{ marginBottom: '16px' }}
          {...form.getInputProps('link')}
        />

        <Button
          fullWidth
          className="bg-yellow-500"
          color="yellow"
          type="submit"
          loading={loading === LoadingState.CREATE_CAMPAIGN}
          disabled={loading === LoadingState.CREATE_CAMPAIGN}
        >
          Create Campaign
        </Button>
      </form>
    </>
  )
}

export default CreatePushNotificationForm
