export interface SendAgentMessageDto {
  agentID: string;
  agentEmail: string;
  ticketID: string;
  messageContent?: string;
  file?: Buffer;
  fileName?: string;
  mimeType?: string;
}
