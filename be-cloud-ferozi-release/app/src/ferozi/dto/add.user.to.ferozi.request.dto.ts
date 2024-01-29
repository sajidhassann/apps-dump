import { IsNotEmpty, IsString } from 'class-validator';

export class AddOrDeleteUserToFeroziRequestDto {
  @IsNotEmpty()
  @IsString()
  public feroziID: string;

  @IsNotEmpty()
  @IsString()
  public userID: string;
}
