import { TicketAgentAssignmentDbModel } from 'src/database/models/ticket.agent.assignment.db.model';

export class AgentTicketAssignmentModel {
  id: string;
  agentID: string;
  ticketID: string;

  constructor(data: TicketAgentAssignmentDbModel) {
    this.id = data.id ?? '';
    this.agentID = data.agentID ?? '';
    this.ticketID = data.ticketID ?? '';
  }
}
