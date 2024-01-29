import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { toggleSelectList } from '@/application/redux/states/agent/ticket'
import { ITicketState } from '@/application/redux/states/agent/ticket/types'
import { IAuthState } from '@/application/redux/states/shared/auth/types'
import { SocketEvent } from '@/application/socket/socket.events.enum'
import { Box, Button, Menu, Modal, Text, useMantineTheme } from '@mantine/core'
import { IconDotsVertical } from '@tabler/icons-react'
import { useCallback, useState } from 'react'
import useSocket from '@/application/socket/useSocket'

export default function TicketMenuItems() {
  const theme = useMantineTheme()

  const [{ selectedTickets }, { user }]: [ITicketState, IAuthState] = useAppSelector((state) => [state.ticket, state.auth])

    const [archiveModal, setArchiveModal] = useState<boolean>(false)
  const dispatch = useAppDispatch()

    const { socket } = useSocket()

  const onAssignTicketHandler = useCallback(() => {
    const ticketIDs = Object.keys(selectedTickets)

    if (ticketIDs.length > 0) 
      socket?.emit(SocketEvent.ASSIGN_TICKET, { ticketIDs, agentEmail: user?.email, agentID: user?.id })

    dispatch(toggleSelectList())
  
  }, [selectedTickets, socket, user?.email, user?.id, dispatch])

  const onArchiveTicketHandler = useCallback(() => {
    const ticketIDs = Object.keys(selectedTickets)

    if (ticketIDs.length > 0) 
      socket?.emit(SocketEvent.ARCHIVE_TICKET, { ticketIDs })

    dispatch(toggleSelectList())
  
  }, [selectedTickets, socket, dispatch])


  return (
    <Menu shadow="md" width={150}>
      <Menu.Target>
        <IconDotsVertical
          size="14"
          color={theme.colors.background[3]}
          cursor="pointer"
        />
      </Menu.Target>

      <Menu.Dropdown>
          <Menu.Item onClick={onAssignTicketHandler}>Assign to me</Menu.Item>
          <Menu.Item onClick={()=>setArchiveModal(true)}>Archive</Menu.Item>
          <Menu.Item onClick={() => dispatch(toggleSelectList())}>Cancel</Menu.Item>
      </Menu.Dropdown>
        <Modal opened={archiveModal} onClose={()=>setArchiveModal(false)} title="Archive Tickets" centered={true} >
            <Text sx={{ textAlign:'center' }}>Archiving, Are you sure?</Text>
            <Box p='1rem' sx={{ display:'flex', flexDirection:'row', width:'100%', justifyContent:'space-around', alignItems:'center' }}>
                <Button variant='outline' color='red' onClick={onArchiveTicketHandler}>
                    Archive
                </Button>
                <Button variant='outline' color='blue' onClick={()=>setArchiveModal(false)}>
                    Cancel
                </Button>
            </Box>
        </Modal>
    </Menu>
  )
}
