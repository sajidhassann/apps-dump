import { TicketStatus } from '@/application/constants/enums/ticket.status.enum'

interface TicketPagination {
    pageSize : number
    pageNumber: number
    search?: string
    statuses?: TicketStatus[]
    agentID?: string
}

export default TicketPagination