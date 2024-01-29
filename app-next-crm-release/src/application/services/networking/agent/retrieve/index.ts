import { CRM_API_URL, USER_INFO_API } from '@/application/constants/urls'
import TicketPagination from '@/application/models/ticket/ticket.pagination'
import axios from 'axios'
import { Pagination } from '../../../../models/shared/pagination.model'
import { TicketMessage } from '../../../../models/ticket/ticket.message.model'
import { Ticket } from '../../../../models/ticket/tickets.model'
import { User, UserData } from '@/application/models/shared/user.model'
import CohortCallPagination from '@/application/models/ticket/cohort.call.pagination'
import { CampaignBucketCall } from '@/application/models/cohort/campaign.bucket.call.model'
import { CampaignBucket } from '@/application/models/cohort/campaign.bucket.model'
import { AuthManager } from '@/application/services/auth'
import { UserProperties } from '@/application/models/ticket/user.properties.model'

export class Retrieve {

    static async getAgents(): Promise<User[]> {
        const response = await axios.get<UserData[]>(`${CRM_API_URL}/agent/list`)

        const data = response.data.map((item) => new User(item))

        return data
    }

    static async getCampaignBuckets(): Promise<CampaignBucket[]> {
        const response = await axios.get<CampaignBucket[]>(`${CRM_API_URL}/agent/cohorts`)

        const data = response.data.map((item) => new CampaignBucket(item))

        return data
    }

    static async getCampaignBucketCalls(payload: CohortCallPagination): Promise<Pagination<CampaignBucketCall>> {

        const url = new URL(`${CRM_API_URL}/agent/cohort-calls`)
        url.searchParams.set('cohortID', payload.cohortID)
        url.searchParams.set('pageNumber', payload.pageNumber.toString())
        url.searchParams.set('pageSize', payload.pageSize.toString())
        if (payload.agentEmail)
            url.searchParams.set('agentEmail', payload.agentEmail)

        if (payload.date)
            url.searchParams.set('date', payload.date)

        if (payload.interestStatus)
            url.searchParams.set('interestStatus', payload.interestStatus)

        if (payload.number)
            url.searchParams.set('number', payload.number)
        if (payload.status)
            url.searchParams.set('status', payload.status)
        if (payload.grade)
            url.searchParams.set('grade', payload.grade)


        const response = await axios.get<Pagination<CampaignBucketCall>>(url.toString())

        const calls = response.data.items.map((item) => new CampaignBucketCall(item))

        return new Pagination({
            count: response.data.count,
            pageSize: response.data.pageSize,
            totalPages: response.data.totalPages,
            items: calls,
            pageNumber: response.data.pageNumber
        })

    }

    static async getUnreadChats(payload: TicketPagination): Promise<Pagination<Ticket>> {
        return Retrieve.getTickets({ ...payload, url: 'unread' })
    }

    static async getAllTickets(payload: TicketPagination): Promise<Pagination<Ticket>> {
        return Retrieve.getTickets({ ...payload, url: 'active' })
    }

    static async getOTPTickets(payload: TicketPagination): Promise<Pagination<Ticket>> {
        return Retrieve.getTickets({ ...payload, url: 'otp' })
    }

    static async getMyTickets(payload: TicketPagination): Promise<Pagination<Ticket>> {
        return Retrieve.getTickets({ ...payload, url: `user/${payload.agentID}` })
    }

    static getInactiveTickets(payload: TicketPagination): Promise<Pagination<Ticket>> {
        return Retrieve.getTickets({ ...payload, url: 'inactive' })
    }

    static async getReadChats(): Promise<Ticket[]> {
        const response = await axios.get(`${CRM_API_URL}/agent/tickets/read/`)

        return response.data.tickets.map((item: Ticket) => new Ticket(item))
    }

    static async getHistoryTickets(number: string): Promise<Ticket[]> {
        const response = await axios.get(`${CRM_API_URL}/agent/tickets/history/${number}`)

        console.log('response.data >> ', response.data)

        return response.data.map((item: Ticket) => new Ticket(item))
    }

    static async getTicketMessages(ticketID: string): Promise<TicketMessage[]> {

        const response = await axios.get(`${CRM_API_URL}/agent/tickets/chat/${ticketID}`)

        const data = response.data.map((item: TicketMessage) => new TicketMessage(item))
        return data
    }

    static async getUserProperties(number: string): Promise<UserProperties> {
        const token = await AuthManager.getAccessToken()
        const response = await axios.get<UserProperties>(`${USER_INFO_API}/user/+${number}`, { headers: { Authorization: `Bearer ${token}` } })
        console.log('RESPONSE by: ', response)
        return new UserProperties(response.data)
    }

    static async getUserAdditionalProperties(number: string): Promise<UserProperties> {
        const token = await AuthManager.getAccessToken()
        const response = await axios.get(`${USER_INFO_API}/user/trino/+${number}`, { headers: { Authorization: `Bearer ${token}` } })
        console.log('RESPONSE by: ', response)
        return response.data
    }

    private static async getTickets(payload: TicketPagination & { url: string }): Promise<Pagination<Ticket>> {

        const url = new URL(`${CRM_API_URL}/agent/tickets/${payload.url}`)
        url.searchParams.set('pageNumber', payload.pageNumber.toString())
        url.searchParams.set('pageSize', payload.pageSize.toString())
        if (payload.search)
            url.searchParams.set('search', payload.search)

        if (payload.statuses?.length)
            url.searchParams.set('statuses', JSON.stringify(payload.statuses))

        const response = await axios.get<Pagination<Ticket>>(url.toString())

        const tickets = response.data.items.map((item) => new Ticket(item))

        return new Pagination({
            count: response.data.count,
            pageSize: response.data.pageSize,
            totalPages: response.data.totalPages,
            items: tickets,
            pageNumber: response.data.pageNumber
        })
    }
}