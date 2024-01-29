import { Grid } from '@mantine/core'
import TicketChatList from './TicketChatList'
import TicketChatPanel from './TicketChatPanel'
import TicketChatProfile from './TicketChatProfile'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { getAllAgents } from '@/application/redux/networkThunk/agent/ticket'
import MacrosManager from './MacrosManager'
import { IMacroState } from '@/application/redux/states/shared/macros/types'
import { getMacros } from '@/application/redux/networkThunk/macros'


const TicketChat = () => {
  const { showMacrosManager }: IMacroState = useAppSelector((state) => state.macro)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAllAgents())
    dispatch(getMacros())
  }, [dispatch])

  return (
    <Grid sx={{ maxHeight: 'calc(100vh - 65px)', overflow: 'scroll' }}>
      <TicketChatList />
      {!showMacrosManager && <TicketChatPanel />}
      {!showMacrosManager && <TicketChatProfile />}
      {showMacrosManager && <MacrosManager/>}

    </Grid>
  )
}


export default TicketChat
