import { Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class UpdateMacroRequestDto implements Prisma.MacroUpdateInput {
  @IsNotEmpty({
    message: 'MacroID cannot be empty',
  })
  id: string;
  title?: string;
  response?: string;
  tags?: string[];
}
