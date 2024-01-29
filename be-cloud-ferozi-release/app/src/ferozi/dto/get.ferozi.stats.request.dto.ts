import { IsNotEmpty } from 'class-validator';

export class GetFeroziStatsRequestDTO {
  @IsNotEmpty()
  feroziID: string;
}
