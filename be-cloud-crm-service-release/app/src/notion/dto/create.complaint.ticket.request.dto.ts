export class CreateComplaintTicketRequestDTO {
  title: string;
  priority: string;
  studentNumber: string;
  //source?: string;
  teams: string[];
  type: string;
  agentEmail: string;
  assigneeIDs?: string[];
  appVersion: string;
  errorDetails: {
    message?: string;
    mediaUrls?: string[];
  };
}
