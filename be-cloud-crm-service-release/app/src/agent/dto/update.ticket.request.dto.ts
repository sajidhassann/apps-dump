import { Prisma, TicketMode, TicketStatus } from '@prisma/client';

import { IsNotEmpty } from 'class-validator';

export class UpdateTicketRequestDto implements Prisma.TicketUpdateInput {
  @IsNotEmpty({
    message: 'TicketID cannot be empty',
  })
  id: string;
  username?: string;
  isRead?: boolean;
  status?: TicketStatus;
  number?: string;
  currentMenu?: string;
  menuSent?: boolean;
  mode?: TicketMode;
  tags?: string[];
}
