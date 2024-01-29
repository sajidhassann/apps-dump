import { Ferozi, FeroziNature, FeroziType } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class DeleteFeroziRequestDTO {
  @IsNotEmpty()
  feroziID: string;
}

