import TicketPagination from '@/application/models/ticket/ticket.pagination'
import { NetworkingManger } from '@/application/services/networking'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TicketThunkType } from './types'

export const getUnreadTickets = createAsyncThunk(
    TicketThunkType.loadUnreadTickets,
    async (payload: TicketPagination) => {
        try {
            return await NetworkingManger.agent.retrieve.getUnreadChats(payload)
        } catch (error) {
            console.log({ error })
        }
    }
)

export const getAllAgents = createAsyncThunk(
    TicketThunkType.loadAgents,
    async () => {
        try {
            return await NetworkingManger.agent.retrieve.getAgents()
        } catch (error) {
            console.log({ error })
            return []
        }
    }
)

export const getAllTickets = createAsyncThunk(
    TicketThunkType.loadAllTickets,
    async (payload: TicketPagination) => {
        try {
            return await NetworkingManger.agent.retrieve.getAllTickets(payload)
        } catch (error) {
            console.log({ error })
        }
    }
)

export const getMyTickets = createAsyncThunk(
    TicketThunkType.loadMyTickets,
    async (payload: TicketPagination) => {
        try {
            return await NetworkingManger.agent.retrieve.getMyTickets(payload)
        } catch (error) {
            console.log({ error })
        }
    }
)

export const getInactiveTickets = createAsyncThunk(
    TicketThunkType.loadInactiveTicketMessages,
    (payload: TicketPagination) => {
        try {
            return NetworkingManger.agent.retrieve.getInactiveTickets(payload)
        } catch (error) {
            console.log({ error })
        }
    }
)

export const getOTPTickets = createAsyncThunk(
    TicketThunkType.loadOTPTicketMessages,
    (payload: TicketPagination) => {
        try {
            return NetworkingManger.agent.retrieve.getOTPTickets(payload)
        } catch (error) {
            console.log({ error })
        }
    }
)
export const getTicketMessages = createAsyncThunk(
    TicketThunkType.loadTicketMessages,
    (ticketID: string) => {
        try {
            return NetworkingManger.agent.retrieve.getTicketMessages(ticketID)
        } catch (error) {
            console.log({ error })
        }
    }
)

export const getHistoryTickets = createAsyncThunk(
    TicketThunkType.loadHistoryTickets,
    (number: string) => {
        try {
            return NetworkingManger.agent.retrieve.getHistoryTickets(number)
        } catch (error) {
            console.log({ error })
        }
    }
)
export const getUserProperties = createAsyncThunk(
    TicketThunkType.getUser,
    (phoneNumber: string) => {
        try {
            return NetworkingManger.agent.retrieve.getUserProperties(phoneNumber)
        } catch (error) {
            console.log({ error })
        }
    }
)
export const getUserAdditionalProperties = createAsyncThunk(
    TicketThunkType.getAdditionalUser,
    (phoneNumber: string) => {
        try {
            return NetworkingManger.agent.retrieve.getUserAdditionalProperties(phoneNumber)
        } catch (error) {
            console.log({ error })
        }
    }
)
