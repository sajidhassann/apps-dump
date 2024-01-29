import { CRM_API_URL } from '@/application/constants/urls'
import axios from 'axios'
import { Ticket } from '../../../../models/ticket/tickets.model'
import { CampaignBucketCall } from '@/application/models/cohort/campaign.bucket.call.model'

export class Update {
    static async updateBucketCall(payload: Partial<CampaignBucketCall>): Promise<CampaignBucketCall> {
        const response = await axios.patch(`${CRM_API_URL}/agent/cohort-call/${payload.id}`, payload)

        const data = new CampaignBucketCall(response.data)

        return data
    }

    static async updateTicket(payload: Partial<Ticket>): Promise<void> {
        const clonedTicket = { ...payload, updatedAt: undefined, createdAt: undefined, ticketAgentAssignment: undefined, isDisabled: undefined }
        return axios.patch(`${CRM_API_URL}/agent/ticket`, clonedTicket)
    }

    static async markTicketRead(payload: Ticket): Promise<void> {
        const response = await axios.patch(`${CRM_API_URL}/agent/ticket`, payload)
        return
    }
}