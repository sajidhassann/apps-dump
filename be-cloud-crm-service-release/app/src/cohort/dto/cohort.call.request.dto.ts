import { InterestStatus } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CohortCallRequestQuery {
  @IsNotEmpty({ message: 'page number is a required field.' })
  pageNumber: number;

  pageSize: number;

  cohortID: string;

  agentEmail: string;

  date: Date;

  interestStatus: InterestStatus;

  number: string;

  grade: string;
}
