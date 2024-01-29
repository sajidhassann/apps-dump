
export class CreateCampaignRequestDto {

  id: string;
  name: string;
  bucketID: string;
  notes: string;
  phoneType: string;
  phoneNumber: string;
  board: string;
  subjects: string[];
  tuition: boolean;
  status: string;

}