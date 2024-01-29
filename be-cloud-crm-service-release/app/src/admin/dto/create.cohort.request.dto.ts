import { Availability } from '@prisma/client';

export class CreateCohortRequestDto {
  id?: string;
  name: string;
  adminID: string;
  type: string;
  availability?: Availability;
}
