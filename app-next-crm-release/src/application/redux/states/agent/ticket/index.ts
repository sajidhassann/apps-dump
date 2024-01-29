import { DEFAULT_PAGE_SIZE } from '@/application/constants'
import { TicketMode } from '@/application/constants/enums/ticket.mode.enum'
import { ActiveTicketStatus } from '@/application/constants/enums/ticket.status.enum'
import { TicketTab } from '@/application/constants/enums/ticket.tab'
import { Pagination } from '@/application/models/shared/pagination.model'
import { User } from '@/application/models/shared/user.model'
import { TicketMessage } from '@/application/models/ticket/ticket.message.model'
import { Ticket } from '@/application/models/ticket/tickets.model'
import {
    getAllAgents,
    getAllTickets,
    getHistoryTickets,
    getInactiveTickets,
    getMyTickets,
    getOTPTickets,
    getTicketMessages,
    getUserProperties,
    getUserAdditionalProperties,
    getUnreadTickets
} from '@/application/redux/networkThunk/agent/ticket'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { defaultState, FilterOptions } from './types'
import { TicketTag } from '@/application/constants/enums/ticket.tag.enum'
import { UserProperties } from '@/application/models/ticket/user.properties.model'

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState: defaultState,
    reducers: {
        setActiveTab: (state, action: PayloadAction<TicketTab>) => {
            state.activeTab = action.payload
            state.selectedTickets = {}
        },
        toggleSelectedTicket: (state, action: PayloadAction<Ticket>) => {
            const { payload: ticket } = action

            if (state.selectedTickets[ticket.id]) {
                delete state.selectedTickets[ticket.id]
                state.isAllTicketsSelected = false
                return
            }

            state.selectedTickets[ticket.id] = ticket

        },
        appendTicketMessage: (state, action: PayloadAction<TicketMessage>) => {
            if (state.currentTicket)
                state.ticketMessages = [...state.ticketMessages, new TicketMessage(action.payload)]
        },
        setCurrentTicket: (state, action: PayloadAction<Ticket>) => {
            state.currentTicket = action.payload
        },

        updateSocketTicketMessage: (state, action: PayloadAction<{ ticket: Ticket, user?: User }>,) => {
            const { payload: { ticket, user } } = action

            let items = state[state.activeTab].items

            if (ticket.id === state.currentTicket?.id) {
                state.currentTicket = ticket
                items = items.filter((item) => item.id !== ticket.id)
                items.unshift(ticket)
            } else {
                const foundTicket = items.find((item) => item.id === ticket.id)
                const condition = ticket.status in ActiveTicketStatus
                    && (
                        (state.activeTab === TicketTab.UNREAD_TICKETS
                            && ticket.mode === TicketMode.AGENT
                            && !ticket.agentEmail
                            && !ticket.tags?.includes(TicketTag.OTP_ISSUE))
                        || (state.activeTab === TicketTab.MY_TICKETS
                            && ticket.agentEmail === user?.email)
                        || (state.activeTab === TicketTab.OTP_TICKETS
                            && ticket.tags?.includes(TicketTag.OTP_ISSUE))
                        || (state.activeTab === TicketTab.ALL_TICKETS
                            && !ticket.tags?.includes(TicketTag.OTP_ISSUE))
                    )

                if (state[state.activeTab].pageNumber === 1 && condition) {

                    if (foundTicket)
                        items = items.filter((item) => item.id !== ticket.id)
                    else
                        items = items.slice(0, -1)

                    items.unshift(ticket)

                    // if (items.length > state[state.activeTab].pageSize)
                    //     items = items.slice(0, -1)

                } else if (foundTicket) {
                    items = items.map((item) => ticket.id === item.id ? ticket : item)
                    // items = items.filter((item) => item.id !== ticket.id)
                    //     getTickets[state.activeTab]({
                    //         pageNumber: 1,
                    //         pageSize: state[state.activeTab].pageSize,
                    //         statuses: Object.keys(state.filters.statuses) as TicketStatus[],
                    //         search: state.filters.search,
                    //         agentID: user?.id,
                    //     })
                    // state.filters = { ...state.filters }
                    // re-fetch current page data
                }
            }

            state[state.activeTab] = new Pagination<Ticket>({
                ...state[state.activeTab],
                items,
            })
        },

        updateSocketTicket: (state, action: PayloadAction<Ticket>,) => {
            const { payload: ticket } = action

            let items = state[state.activeTab].items

            if (ticket.id === state.currentTicket?.id)
                state.currentTicket = ticket


            const foundTicket = items.find((item) => item.id === ticket.id)

            if (foundTicket) {
                items = items.map((item) => ticket.id === item.id ? ticket : item)

                state[state.activeTab] = new Pagination<Ticket>({
                    ...state[state.activeTab],
                    items,
                })
            }
        },

        setFilters: (state, action: PayloadAction<FilterOptions>) => {
            state.filters = action.payload
        },

        toggleSelectList: (state, action: PayloadAction<void>) => {
            state.showSelectList = !state.showSelectList

            if (!state.showSelectList)
                state.selectedTickets = {}

        },
        toggleShowTicketTabs: (state, action: PayloadAction<void>) => {
            state.showTicketTabs = !state.showTicketTabs
        },

        selectAllTickets: (state) => {
            state.selectedTickets = state[state.activeTab].items.reduce((map: { [p: string]: Ticket }, ticket) => {
                map[ticket.id] = ticket
                return map
            },
                {})
            state.isAllTicketsSelected = true
        },

        emptySelectedTickets: (state) => {
            state.selectedTickets = {}
            state.isAllTicketsSelected = false
        },
    },
    extraReducers: (builder) => {

        builder.addCase(getAllAgents.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getAllAgents.fulfilled, (state, action) => {
            console.log({ action })

            state.agents = action.payload ?? []
            state.isLoading = false
        })

        builder.addCase(getAllAgents.rejected, (state, action) => {
            console.log({ action })
            state.isLoading = false
        })

        builder.addCase(getTicketMessages.pending, (state) => {

            state.isLoading = true
        })

        builder.addCase(getTicketMessages.fulfilled, (state, action) => {

            state.ticketMessages = action.payload ?? []
            state.isLoading = false
        })

        builder.addCase(getTicketMessages.rejected, (state, action) => {
            console.log({ action })
            state.isLoading = false
        })

        builder.addCase(getUserProperties.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getUserProperties.fulfilled, (state, action) => {
            console.log({ action })

            state.details = action.payload
            state.isLoading = false
        })

        builder.addCase(getUserProperties.rejected, (state, action) => {
            console.log({ action })
            state.details = undefined
            state.isLoading = false
        })

        builder.addCase(getUserAdditionalProperties.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getUserAdditionalProperties.fulfilled, (state, action) => {
            console.log({ action })

            state.details = new UserProperties({ ...state.details, ...action.payload } as UserProperties)
            state.isLoading = false
        })

        builder.addCase(getUserAdditionalProperties.rejected, (state, action) => {
            console.log({ action })
            state.details = undefined
            state.isLoading = false
        })

        builder.addCase(getAllTickets.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getAllTickets.fulfilled, (state, action) => {
            console.log({ action })
            state.allTickets = action.payload ?? new Pagination({
                count: 0,
                pageSize: DEFAULT_PAGE_SIZE,
                totalPages: 0,
                pageNumber: 1,
                items: [],
            })
            state.isLoading = false
        })

        builder.addCase(getAllTickets.rejected, (state, action) => {
            console.log({ action })
            state.isLoading = false
        })

        builder.addCase(getOTPTickets.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getOTPTickets.fulfilled, (state, action) => {
            console.log({ action })
            state.OTPTickets = action.payload ?? new Pagination({
                count: 0,
                pageSize: DEFAULT_PAGE_SIZE,
                totalPages: 0,
                pageNumber: 1,
                items: [],
            })
            state.isLoading = false
        })

        builder.addCase(getOTPTickets.rejected, (state, action) => {
            console.log({ action })
            state.isLoading = false
        })

        builder.addCase(getUnreadTickets.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getUnreadTickets.fulfilled, (state, action) => {
            state.unreadTickets = action.payload ?? new Pagination({
                count: 0,
                pageSize: DEFAULT_PAGE_SIZE,
                totalPages: 0,
                pageNumber: 1,
                items: [],
            })
            state.isLoading = false
        })

        builder.addCase(getUnreadTickets.rejected, (state, action) => {
            console.log({ action })
            state.isLoading = false
        })

        builder.addCase(getInactiveTickets.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getInactiveTickets.fulfilled, (state, action) => {
            state.inactiveTickets = action.payload ?? new Pagination({
                count: 0,
                pageSize: DEFAULT_PAGE_SIZE,
                totalPages: 0,
                pageNumber: 1,
                items: [],
            })
            state.isLoading = false
        })

        builder.addCase(getInactiveTickets.rejected, (state, action) => {
            console.log({ action })
            state.isLoading = false
        })

        builder.addCase(getMyTickets.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getMyTickets.fulfilled, (state, action) => {
            state.myTickets = action.payload ?? new Pagination({
                count: 0,
                pageSize: DEFAULT_PAGE_SIZE,
                totalPages: 0,
                pageNumber: 1,
                items: [],
            })
            state.isLoading = false
        })

        builder.addCase(getMyTickets.rejected, (state, action) => {
            console.log({ action })
            state.isLoading = false
        })

        builder.addCase(getHistoryTickets.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getHistoryTickets.fulfilled, (state, action) => {
            console.log('Fullfilled ',{ action })
            
            state.historyTickets = action.payload ?? []
            state.isLoading = false
        })

        builder.addCase(getHistoryTickets.rejected, (state, action) => {
            console.log('Rejected ',{ action })
            state.isLoading = false
        })
        

    },
})

export const {
    toggleSelectList,
    toggleSelectedTicket,
    appendTicketMessage,
    setFilters,
    updateSocketTicket,
    updateSocketTicketMessage,
    setActiveTab,
    setCurrentTicket,
    selectAllTickets,
    emptySelectedTickets,
    toggleShowTicketTabs,
} = ticketSlice.actions

export default ticketSlice.reducer 