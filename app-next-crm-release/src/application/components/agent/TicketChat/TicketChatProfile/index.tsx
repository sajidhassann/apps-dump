import { TicketStatus } from '@/application/constants/enums/ticket.status.enum'
import { Ticket } from '@/application/models/ticket/tickets.model'
import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import { ITicketState } from '@/application/redux/states/agent/ticket/types'
import { setShowContactProfile, } from '@/application/redux/states/shared/layout'
import { Box, CloseButton, Grid, ScrollArea, Select, Text } from '@mantine/core'
import React, { useCallback, useEffect, useState } from 'react'
import TagList from './TagList'
import useStyles from './styles'
import { NetworkingManger } from '@/application/services/networking'
import useSocket from '@/application/socket/useSocket'
import { SocketEvent } from '@/application/socket/socket.events.enum'
import { getHistoryTickets } from '@/application/redux/networkThunk/agent/ticket'
import TicketChatCard from '../TicketChatList/TicketChatTabs/TicketChatCard'
import UserProperties from './UserProperties'

const ticketStatuses = Object.values(TicketStatus).map(status => ({
    value: status,
    label: status,
    disabled: [TicketStatus.UNREAD, TicketStatus.CLOSED].includes(status)
}))

const TicketChatProfile = () => {

    const { classes } = useStyles()
    const [showTagList, setShowTagList] = useState<boolean>(false)
    const [showUserProperties, setShowUserProperties] = useState<boolean>(false)

    const { currentTicket, agents, historyTickets }: ITicketState = useAppSelector((state) => state.ticket)

    const dispatch = useAppDispatch()
    const { showContactProfile } = useAppSelector(state => state.layout)

    const { socket } = useSocket()

    const onCloseHandler = useCallback(() => {
        dispatch(setShowContactProfile(false))
    }, [dispatch])

    const onStatusChangeHandler = useCallback(async (value: string) => {
        const updatedTicket = { id: currentTicket?.id, status: value.toUpperCase() } as Ticket

        await NetworkingManger.agent.update.updateTicket(updatedTicket || {} as Ticket)
    }, [currentTicket])

    const onAgentChangeHandler = useCallback(async (value: string) => {
        console.log(value)
        const [agentID, agentEmail] = value.split('_')
        socket?.emit(SocketEvent.ASSIGN_TICKET, { ticketIDs: [currentTicket?.id], agentEmail, agentID })
    }, [socket, currentTicket?.id])


    useEffect(() => {
        if (currentTicket?.number) {
            console.log('currentTicket.number', currentTicket.number)
            dispatch(getHistoryTickets(currentTicket.number))
        }
    }, [dispatch, currentTicket?.number])


    return (
        <>
            {!currentTicket ? (<></>) : (
                <Grid.Col span={3} sx={{ display: showContactProfile ? 'block' : 'none' }}>
                    {showTagList ?
                        <TagList setShowTagList={setShowTagList} ticket={currentTicket}/> : showUserProperties ?
                            <UserProperties setShowUserProperties={setShowUserProperties}/> : (
                                <>
                                    <Box className={classes.headerContainer}>
                                        <CloseButton title="Close Profile" size="sm" iconSize={20}
                                                     onClick={onCloseHandler}/>
                                        <Text className={classes.headerText}>Contact Info</Text>
                                    </Box>
                                    <Box p="xs" my='lg' mx='auto' ta='center'>
                                        <Text className={classes.ticket}>Ticket no: <span style={{
                                            fontSize: '12px',
                                            color: '#646466'
                                        }}>{currentTicket.id}</span></Text>
                                    </Box>
                                    <Box className={classes.selectContainer} px='md'>
                                        <Text className={classes.label}>Status</Text>
                                        <Select
                                            placeholder="Select status"
                                            variant='unstyled'
                                            color="dark"
                                            value={currentTicket.status}
                                            disabled={currentTicket.isDisabled}
                                            data={ticketStatuses}
                                            onChange={onStatusChangeHandler}
                                            styles={() => ({
                                                item: {
                                                    '&[data-selected]': {
                                                        '&, &:hover': {
                                                            color: 'black'
                                                        },
                                                    },
                                                },
                                                dropdown: { padding: '12px' }
                                            })}
                                        />
                                    </Box>
                                    <Box className={classes.selectContainer} px='md'>
                                        <Text className={classes.label}>Assign To</Text>
                                        <Select
                                            value={currentTicket?.id ? `${currentTicket.agentID}_${currentTicket.agentEmail}` : null}
                                            onChange={onAgentChangeHandler}
                                            placeholder="Select agent"
                                            variant='unstyled'
                                            data={agents.map((agent) => ({
                                                value: `${agent.id}_${agent.email}`,
                                                label: agent.email
                                            }))}
                                            styles={{ root: { marginBottom: '12px' } }}
                                        />
                                    </Box>
                                    <Box className={classes.selectContainer} px='md' py='sm'>
                                        <Text w='50%' className={classes.label}>Tags</Text>
                                        <Box w='50%' className={classes.tags} onClick={() => setShowTagList(true)}>
                                            <Text className={classes.label}>Select Tags</Text>
                                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1L6 6L1 11" stroke="#646466" strokeWidth="1.5"
                                                      strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </Box>
                                    </Box>
                                    <Box className={classes.selectContainer} px='md' py='sm'>
                                        <Text w='50%' className={classes.label}>User Properties</Text>
                                        <Box w='50%' className={classes.tags}
                                             onClick={() => setShowUserProperties(true)}>
                                            <Text className={classes.label}>See all</Text>
                                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1L6 6L1 11" stroke="#646466" strokeWidth="1.5"
                                                      strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </Box>
                                    </Box>
                                    <Box>
                                        {historyTickets.length > 0 && <Text fw='bold' p='1rem'>Previous Chats</Text>}
                                        <ScrollArea h="40vh" mb="lg">
                                            {historyTickets.map((ticket) => (
                                                <TicketChatCard key={ticket.id} ticket={ticket}/>
                                            ))}
                                        </ScrollArea>
                                    </Box>
                                </>
                            )}
                </Grid.Col>
            )}
        </>
    )
}

export default TicketChatProfile
