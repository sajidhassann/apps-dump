import { DialerTags } from '@/application/constants/enums/dialer.tags.enum'
import { CampaignBucketCall } from '@/application/models/cohort/campaign.bucket.call.model'
import { useAppDispatch } from '@/application/redux/hooks'
import { updateBucketCall } from '@/application/redux/networkThunk/agent/campaignBucket'
import { Box, Button, Group, Modal, MultiSelect, Select, Textarea, TextInput } from '@mantine/core'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { NotificationType, Notify } from '../../core/Notification'
import { useForm } from '@mantine/form'
import { InterestStatus } from '@/application/constants/enums/interest.status'
import Utilities from '@/application/utils'

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  call: CampaignBucketCall;
};

export default function AgentModal(props: Props) {
  const { isOpen, setIsOpen, call } = props
  const form = useForm({
    initialValues: {
      text: call?.notes,
      name: `${call?.fName} ${call?.lName}`,
      dialerTags: call?.tags,
    },
  })

  const dispatch = useAppDispatch()

  const onSave = useCallback((values: any) => {
    setIsOpen(false)
    dispatch(updateBucketCall({ id: call.id, notes: values.text.trim(), fName: values.name.trim().split(" ")[0], lName: values.name.trim().split(" ").slice(1).join(" "), tags: values.dialerTags}))
    Notify({
      type: NotificationType.SUCCESS,
      message: 'Notes updated successfully',
      title: 'Notes updated successfully',
    })
  }, [])

  return (
    <>
      <Modal
        opened={isOpen}
        onClose={() => setIsOpen(false)}
        title={<div style={{ color: '#1B2559' }}>Edit Details</div>}
      // sx={{ color: '#1B2559' }}
      >
        <form onSubmit={form.onSubmit(onSave)}>
          <Box>
            <TextInput
              label={<span style={{ color: '#1B2559' }}>Name</span>}
              withAsterisk
              {...form.getInputProps('name')}
            />
          </Box>
          <Box my='md' sx={{ color: '#1B2559' }}>
            <MultiSelect
              data={Object.keys(DialerTags).map((val) => val)}
              label={<span style={{ color: '#1B2559' }}>Tags</span>}
              searchable
              nothingFound="Nothing found"
              placeholder="Pick all that you like"
              {...form.getInputProps('dialerTags')}
            />
          </Box>
          <Textarea
            label={<span style={{ color: '#1B2559' }}>Notes</span>}
            withAsterisk
            {...form.getInputProps('text')}
          />
          <Group mt="xl" position="right">
            <Button
              type='submit'
              variant="outline"
              sx={{ color: '#1B2559', borderColor: '#1B2559' }}
            >
              Save
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  )
}


