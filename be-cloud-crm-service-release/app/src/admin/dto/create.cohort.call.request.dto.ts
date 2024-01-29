import { Availability } from 'src/constants/enums/availability.enum';
import { CallStatus } from 'src/constants/enums/call.status.enum';

export class CreateCohortCallRequestDto {
  fName: string;
  lName: string;
  cohortID: string;
  interestedIn?: string;
  number: string;
}
