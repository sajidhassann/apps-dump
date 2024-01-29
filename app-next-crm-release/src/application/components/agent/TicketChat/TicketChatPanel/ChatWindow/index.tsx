import { TicketMessage } from '@/application/models/ticket/ticket.message.model'
import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { getTicketMessages } from '@/application/redux/networkThunk/agent/ticket'
import { appendTicketMessage } from '@/application/redux/states/agent/ticket'
import { ITicketState } from '@/application/redux/states/agent/ticket/types'
import { Box, ScrollArea, Stack, useMantineTheme } from '@mantine/core'
import { useCallback, useEffect, useRef } from 'react'
import Message from './TextMessage'
import { SocketEvent } from '@/application/socket/socket.events.enum'
import useSocket from '@/application/socket/useSocket'

export default function ChatWindow() {
  const theme = useMantineTheme()
  const { currentTicket, ticketMessages }: ITicketState = useAppSelector(
    (state) => state.ticket
  )
  const dispatch = useAppDispatch()
  const targetRef = useRef<HTMLDivElement>(null)

  const scrollIntoView = useCallback(()=>{
    setTimeout(()=>{
      targetRef.current?.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' })
    },300)
  },[])

  const appendMessage = useCallback((message: TicketMessage) => {
    console.log('message', message)
    dispatch(appendTicketMessage(message))
    scrollIntoView()
  }, [dispatch, scrollIntoView])

  const { on } = useSocket()

  useEffect(() => {
    return on(currentTicket?.id as SocketEvent, appendMessage)
  }, [appendMessage, currentTicket?.id, on])

  useEffect(() => {
    dispatch(getTicketMessages(currentTicket?.id ?? ''))
    scrollIntoView()
  }, [currentTicket?.id])

  return (
    <ScrollArea h="calc(100vh - 280px)">
      <Stack
        bg={theme.colors.background[1]}
        p="sm"
      >
        {ticketMessages.map((message) => (
          <Message
            key={message.id}
            message={message}
          />
        ))}
        <Box w="100%" h="0.6rem" ref={targetRef}></Box>
      </Stack>
    </ScrollArea>
  )
}
