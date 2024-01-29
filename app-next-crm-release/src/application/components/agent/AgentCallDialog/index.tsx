import { CampaignBucketCall } from '@/application/models/cohort/campaign.bucket.call.model'
import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { updateBucketCall } from '@/application/redux/networkThunk/agent/campaignBucket'
import { IAuthState } from '@/application/redux/states/shared/auth/types'
import { Box, Dialog, Group, MultiSelect, Text, Textarea, Title } from '@mantine/core'
import { useCallback, useEffect, useState } from 'react'
import { Enums } from '@/application/constants'
import { DialerTags } from '@/application/constants/enums/dialer.tags.enum'

export type AgentCallDialogPropTypes = {
  isOpen?: boolean;
  onClose: () => void;
  student: string;
  number: string;
  call: CampaignBucketCall;
};

export default function AgentCallDialog(props: AgentCallDialogPropTypes) {
  const { isOpen = true, onClose, student, number, call } = props

  const { user }: IAuthState = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const [notes, setNotes] = useState<string>('')
  const [tags, setTags] = useState<DialerTags[]>([])

  const [clockHour, setClockHour] = useState<number>(0)
  const [clockMinute, setClockMinute] = useState<number>(0)
  const [clockSeconds, setClockSeconds] = useState<number>(0)

  const [seconds, setSeconds] = useState<number>(0)

  const runTimer = useCallback(() => {
    setSeconds((prevState) => ++prevState)

    setClockHour(Math.floor(seconds / 3600))
    setClockMinute(Math.floor((seconds - clockHour * 3600) / 60))
    setClockSeconds(seconds - (clockHour * 3600 + clockMinute * 60))
  }, [seconds])

  const resetTimer = () => {
    setSeconds(0)

    setClockHour(0)
    setClockMinute(0)
    setClockSeconds(0)
  }

  useEffect(()=>{
    if (call?.tags)
      setTags(call.tags)

    if (call?.notes)
      setNotes(call.notes)
    
  },[call])

  useEffect(() => {
    const timer = setInterval(runTimer, 1000)
    // console.log(`${user?.fName} Bhai, main timer update kar rahi hun!`)

    return () => {
      clearInterval(timer)
    }
  }, [runTimer])

  const handleClose = useCallback(() => {
    
    dispatch(
      updateBucketCall({ id:call.id,notes:notes, status: Enums.callStatus.COMPLETED, tags })
    )

    onClose()
  },[call.id, dispatch, notes, onClose, tags])

  return (
    <Dialog
      opened={isOpen}
      withCloseButton
      onClose={handleClose}
      size="lg"
      radius="md"
    >
      <Title order={3} style={{ marginBottom: 5, color: '#1B2559' }}>
        {`Janab ${student}`}
      </Title>
      <Text style={{ fontSize: '14px', fontWeight: '400' }}>{number}</Text>
      <Text>{`${clockHour}:${clockMinute}:${clockSeconds}`}</Text>
      {/*<Flex justify="space-between" align="center">*/}
        <Box my='md' sx={{ color: '#1B2559' }} w='100%' >
          <Group align="flex-end" w='100%'>
            <Textarea
              label={<span style={{ color: '#1B2559' }}>Notes</span>}
              value={notes}
              placeholder="Enter call notes here"
              onChange={(newNotes) => {
                setNotes(newNotes.target.value)
              }}
              w='100%'
            />
          </Group>

          <MultiSelect
              data={Object.keys(DialerTags).map((val) => val)}
              label={<span style={{ color: '#1B2559' }}>Tags</span>}
              searchable
              nothingFound="Nothing found"
              placeholder="Pick all that you like"
              value={tags}
              onChange={(value: DialerTags[])=>setTags(value)}
          />
        </Box>

        {/* <div> */}
        {/* 	/!* <ActionIcon color="red"> *!/ */}
        {/* 	/!* 	/!* <IconPhoneOff/> *!/ *!/ */}
        {/* 	/!* </ActionIcon> *!/ */}
        {/* 	<div */}
        {/* 		onClick={() => { */}
        {/* 			console.log('Ending call') */}
        {/* 		}} */}
        {/* 		style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', fontWeight: 600 }} */}
        {/* 	> */}
        {/* 		END CALL */}
        {/* 	</div> */}
        {/* </div> */}
      {/*</Flex>*/}
    </Dialog>
  )
}
