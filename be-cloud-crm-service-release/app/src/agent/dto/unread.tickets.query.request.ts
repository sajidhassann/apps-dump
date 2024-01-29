import { IsNotEmpty } from 'class-validator';

export class UnreadTicketsQuery {
  @IsNotEmpty({ message: 'page number is a required field.' })
  pageNumber: number;

  pageSize: number;

  search?: string;
}
