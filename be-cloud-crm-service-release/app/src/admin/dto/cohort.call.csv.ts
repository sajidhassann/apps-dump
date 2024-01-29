import { IsNotEmpty } from 'class-validator';

export default class CohortCallCsv {
  @IsNotEmpty()
  cohortID: string;
}
