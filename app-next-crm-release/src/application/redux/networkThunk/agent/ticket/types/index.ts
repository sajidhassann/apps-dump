export enum TicketThunkType {
    loadUnreadTickets = 'ticket/loadUnreadTickets',
    loadAllTickets = 'ticket/loadAllTickets',
    loadMyTickets = 'ticket/loadMyTickets',
    loadReadTickets = 'ticket/loadReadTickets',
    loadTicketMessages = 'ticket/loadTicketMessages',
    loadInactiveTicketMessages = 'ticket/loadInactiveTicketMessages',
    loadOTPTicketMessages = 'ticket/loadOTPTicketMessages',
    loadAgents = 'ticket/agents',
    loadHistoryTickets = 'ticket/loadHistoryTickets',
    getUser = 'ticket/user',
    getAdditionalUser = 'ticket/user/trino'
}