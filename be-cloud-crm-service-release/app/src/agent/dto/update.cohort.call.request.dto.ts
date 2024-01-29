import { CallStatus, PhoneType } from "@prisma/client";

export class UpdateCohortCallRequestDto
  
{
  fName?: string;
  lName?: string;
  cohortID?: string;
  notes?: string;
  interestedIn?: string;
  phoneType?: PhoneType;
  number?: string;
  board?: string;
  tags?: string[];
  isTuition?: boolean;
  status?: CallStatus;

}
