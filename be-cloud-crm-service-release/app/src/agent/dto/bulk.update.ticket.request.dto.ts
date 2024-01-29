import { Prisma } from '@prisma/client';
import { IsArray, IsNotEmpty } from 'class-validator';

class BulkUpdateTicketRequestDto {
  @IsArray({ message: 'IDs must be array.' })
  @IsNotEmpty({ message: 'IDs must not be empty.' })
  IDs: string[];

  @IsNotEmpty({ message: 'updateTicket must not be empty.' })
  data: Prisma.TicketUncheckedUpdateManyInput;
}

export default BulkUpdateTicketRequestDto;
