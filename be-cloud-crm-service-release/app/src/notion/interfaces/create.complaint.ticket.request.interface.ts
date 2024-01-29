export interface ICreateComplaintTicketRequest {
  title: string;
  priority: string;
  studentNumber: string;
  //source: string;
  teams: string[];
  type: string;
  agentEmail: string; // TODO: get from agentEmail sent from FE?
  assigneeIDs?: string[]; // TODO: Auto-assign to Daniyal Atif
  appVersion: string;
  errorDetails: {
    message?: string;
    mediaUrls?: string[];
  };
}
