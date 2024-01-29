import { TicketMode } from '@/application/constants/enums/ticket.mode.enum'
import { InactiveTicketStatus, TicketStatus } from '@/application/constants/enums/ticket.status.enum'
import TicketAgentAssignment from '@/application/models/ticket/ticket.agent.assignment.model'
import { TicketTag } from '@/application/constants/enums/ticket.tag.enum'


export class Ticket {
	readonly id: string
	readonly username: string
	readonly status: TicketStatus
	readonly number: string
	readonly tags?: TicketTag[]
	readonly isRead: boolean
	readonly ticketAgentAssignment?: TicketAgentAssignment[]
	readonly mode: TicketMode
	readonly isDisabled: boolean
	readonly agentID: string
	readonly agentEmail: string
	readonly createdAt: Date
	readonly updatedAt: Date
	readonly lastMessageAt: Date

	constructor(data: Ticket) {
		this.id = data.id
		this.username = data.username
		this.number = data.number
		this.status = data.status
		this.tags = data.tags ?? []
		this.isRead = data.isRead
		this.mode = data.mode
		this.agentEmail = data.agentEmail ?? ''
		this.agentID = data.agentID ?? ''
		this.ticketAgentAssignment = data.ticketAgentAssignment ?? []
		this.isDisabled = this.status in InactiveTicketStatus
		this.createdAt = new Date(data.createdAt)
		this.updatedAt = new Date(data.updatedAt)
		this.lastMessageAt = new Date(data.lastMessageAt)

	}
}
