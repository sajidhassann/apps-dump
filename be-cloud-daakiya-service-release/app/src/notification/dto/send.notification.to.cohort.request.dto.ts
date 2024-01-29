import { IsNotEmpty } from 'class-validator';

export class SendNotificationToCohortRequestDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  body: string;
  @IsNotEmpty()
  cohortID: string;
}
