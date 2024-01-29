import useDebounce from '@/application/components/core/hooks/UseDebounce'
import { TicketStatus } from '@/application/constants/enums/ticket.status.enum'
import { TicketTab } from '@/application/constants/enums/ticket.tab'
import { Ticket } from '@/application/models/ticket/tickets.model'
import { useAppDispatch, useAppSelector } from '@/application/redux/hooks'
import {
    getAllTickets,
    getInactiveTickets,
    getMyTickets,
    getOTPTickets,
    getUnreadTickets,
} from '@/application/redux/networkThunk/agent/ticket'
import {
    emptySelectedTickets,
    setActiveTab,
    updateSocketTicket,
    updateSocketTicketMessage,
} from '@/application/redux/states/agent/ticket'
import { ITicketState } from '@/application/redux/states/agent/ticket/types'
import { IAuthState } from '@/application/redux/states/shared/auth/types'
import { SocketEvent } from '@/application/socket/socket.events.enum'
import useSocket from '@/application/socket/useSocket'
import { Box, Group, Pagination, ScrollArea, Tabs } from '@mantine/core'
import React, { useCallback, useEffect, useMemo } from 'react'
import TicketChatCard from 'src/application/components/agent/TicketChat/TicketChatList/TicketChatTabs/TicketChatCard'
import useStyles from './styles'

const getTickets = {
    [TicketTab.ALL_TICKETS]: getAllTickets,
    [TicketTab.MY_TICKETS]: getMyTickets,
    [TicketTab.UNREAD_TICKETS]: getUnreadTickets,
    [TicketTab.OTP_TICKETS]: getOTPTickets,
}

export default function TicketChatTabs() {
    const { classes } = useStyles()

    const dispatch = useAppDispatch()

    const [
        {
            unreadTickets,
            activeTab,
            OTPTickets,
            inactiveTickets,
            allTickets,
            myTickets,
            filters,
            showTicketTabs,
        },
        { user },
    ]: [ITicketState, IAuthState] = useAppSelector((state) => [
        state.ticket,
        state.auth,
    ])

    const ticketTabsMap = useMemo(
        () => ({
            [TicketTab.ALL_TICKETS]: allTickets,
            [TicketTab.MY_TICKETS]: myTickets,
            [TicketTab.UNREAD_TICKETS]: unreadTickets,
            [TicketTab.OTP_TICKETS]: OTPTickets,
        }),
        [OTPTickets, allTickets, myTickets, unreadTickets]
    )

    const setActiveTicketTab = useCallback((activeTab: TicketTab) => {
        dispatch(setActiveTab(activeTab))
    }, [dispatch])

    const updateTicket = useCallback((ticket: Ticket) => {
        console.log('ticket from ws >>: ', ticket)
        dispatch(updateSocketTicket(new Ticket(ticket)))
    }, [dispatch])

    const updateTicketMessage = useCallback((ticket: Ticket) => {
        console.log('ticket from ws >>: ', ticket)
        dispatch(updateSocketTicketMessage({ ticket: new Ticket(ticket), user }))
    }, [dispatch, user])

    const onPageChange = useCallback(
        (page: number) => {
            console.log('page', page)
            if (showTicketTabs) {
                dispatch(
                    getTickets[activeTab]({
                        pageNumber: page,
                        pageSize: ticketTabsMap[activeTab].pageSize,
                        statuses: Object.keys(filters.statuses) as TicketStatus[],
                        search: filters.search,
                        agentID: user?.id,
                    })
                )
            } else {
                dispatch(getInactiveTickets({
                    pageNumber: page,
                    pageSize: inactiveTickets.pageSize,
                    search: filters.search,
                }))
            }
            dispatch(emptySelectedTickets())
        },
        [activeTab, dispatch, filters.search, filters.statuses, inactiveTickets.pageSize, showTicketTabs, ticketTabsMap, user?.id]
    )

    useEffect(() => {
        if (!showTicketTabs) {
            dispatch(getInactiveTickets({
                pageNumber: inactiveTickets.pageNumber,
                pageSize: inactiveTickets.pageSize,
                search: filters.search,
            }))
        }
    }, [showTicketTabs])

    const { on } = useSocket()

    useEffect(() => {
        const updateTicketOff = on(SocketEvent.UPDATE_TICKET, updateTicket)
        const updateTicketMessageOff = on(SocketEvent.UPDATE_TICKET_MESSAGE, updateTicketMessage)

        return () => {
            updateTicketOff()
            updateTicketMessageOff()
        }
    }, [on])

    useEffect(() => {
        dispatch(
            getTickets[activeTab]({
                pageNumber: ticketTabsMap[activeTab].pageNumber,
                pageSize: ticketTabsMap[activeTab].pageSize,
                statuses: Object.keys(filters.statuses) as TicketStatus[],
                search: filters.search,
                agentID: user?.id,
            })
        )
    }, [activeTab])

    useDebounce(
        () => {
            if (showTicketTabs) {
                dispatch(getTickets[activeTab]({
                    pageNumber: 1,
                    pageSize: ticketTabsMap[activeTab].pageSize,
                    statuses: Object.keys(filters.statuses) as TicketStatus[],
                    search: filters.search,
                    agentID: user?.id,
                }))
            } else {
                dispatch(getInactiveTickets({
                    pageNumber: 1,
                    pageSize: inactiveTickets.pageSize,
                    search: filters.search
                }))
            }
        },
        500,
        [filters]
    )

    return (
        <Box pos="relative" mih="calc(80vh - 60px)">
            {showTicketTabs && (
                <Tabs
                    color="cyan"
                    defaultValue={TicketTab.UNREAD_TICKETS}
                    className="text-secondary-500"
                    value={activeTab}
                    onTabChange={setActiveTicketTab}
                >
                    <Tabs.List className={classes.tabContainer}>
                        {Object.entries(TicketTab).map(([key, value]) => (
                            <Tabs.Tab key={value} value={value}>
                <span
                    className={
                        activeTab === value
                            ? 'text-secondary-500'
                            : 'text-light-300'
                    }
                >
                  {key.replace(/TICKETS/g, '').replace(/_/g, ' ')} ({ticketTabsMap[value].count})
                </span>
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                    <Tabs.Panel value={TicketTab.ALL_TICKETS}>
                        <ScrollArea h="60vh" mb="lg">
                            {allTickets.items.map((ticket) => (
                                <React.Fragment key={ticket.id}>
                                    {<TicketChatCard ticket={ticket}/>}
                                </React.Fragment>
                            ))}
                        </ScrollArea>
                    </Tabs.Panel>
                    <Tabs.Panel value={TicketTab.UNREAD_TICKETS}>
                        <ScrollArea h="60vh" mb="lg">
                            {unreadTickets.items.map((ticket) => (
                                <React.Fragment key={ticket.id}>
                                    {<TicketChatCard ticket={ticket}/>}
                                </React.Fragment>
                            ))}
                        </ScrollArea>
                    </Tabs.Panel>
                    <Tabs.Panel value={TicketTab.OTP_TICKETS}>
                        <ScrollArea h="60vh" mb="lg">
                            {OTPTickets.items.map((ticket) => (
                                <React.Fragment key={ticket.id}>
                                    {<TicketChatCard ticket={ticket}/>}
                                </React.Fragment>
                            ))}
                        </ScrollArea>
                    </Tabs.Panel>
                    <Tabs.Panel value={TicketTab.MY_TICKETS}>
                        <ScrollArea h="60vh" mb="lg">
                            {myTickets.items.map((ticket) => (
                                <React.Fragment key={ticket.id}>
                                    {<TicketChatCard ticket={ticket}/>}
                                </React.Fragment>
                            ))}
                        </ScrollArea>
                    </Tabs.Panel>
                </Tabs>
            )}
            {!showTicketTabs && (
                <ScrollArea h="60vh" mb="lg">
                    {inactiveTickets.items.map((ticket) => (
                        <React.Fragment key={ticket.id}>
                            {<TicketChatCard ticket={ticket}/>}
                        </React.Fragment>
                    ))}
                </ScrollArea>
            )}

            <Group position="center" pos="absolute" bottom={'-25px'} w="100%">
                <Pagination
                    total={!showTicketTabs ? inactiveTickets.totalPages : ticketTabsMap[activeTab].totalPages}
                    value={!showTicketTabs ? inactiveTickets.pageNumber : ticketTabsMap[activeTab].pageNumber}
                    color="blue"
                    radius="lg"
                    withControls={false}
                    onChange={onPageChange}
                />
            </Group>
        </Box>
    )
}
