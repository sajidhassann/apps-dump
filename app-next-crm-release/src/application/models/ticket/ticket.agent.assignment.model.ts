export default class TicketAgentAssignment {
    readonly id: string
    readonly ticketID: string
    readonly agentID: string
    readonly agentEmail: string

    constructor(data: TicketAgentAssignment) {
        this.id = data.id
        this.ticketID = data.ticketID
        this.agentID = data.agentID
        this.agentEmail = data.agentEmail
    }
}