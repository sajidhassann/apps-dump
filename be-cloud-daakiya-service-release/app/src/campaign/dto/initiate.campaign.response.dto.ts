
export class InitiateCampaignResponseDTO {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;

  constructor(data: InitiateCampaignResponseDTO) {
    this.id = data.id;
    this.name = data.name;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.status = data.status;
  }
}
