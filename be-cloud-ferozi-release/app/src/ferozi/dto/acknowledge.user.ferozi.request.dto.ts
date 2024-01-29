import { IsNotEmpty, IsString } from 'class-validator';

export class AcknowledgeUserFeroziRequestDto {
  @IsNotEmpty()
  @IsString()
  public feroziID: string;

  @IsNotEmpty()
  @IsString()
  public userID: string;
}
