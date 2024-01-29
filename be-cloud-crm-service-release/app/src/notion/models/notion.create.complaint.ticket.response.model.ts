export class NotionCreateComplaintTicketResponse {
  readonly id: string;
  readonly complaintId: string;
  readonly url: string;

  constructor(data: any) {
    this.id = data.id;
    this.complaintId =
      data?.properties?.['Complaint ID']?.formula?.string ??
      'mujhe-kebab-khana-hai';
    this.url = data?.url ?? 'https://maqsad.io';
  }
}
