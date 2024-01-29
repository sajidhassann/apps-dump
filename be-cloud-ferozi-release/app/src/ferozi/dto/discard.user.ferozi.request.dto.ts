import { IsNotEmpty, IsString } from 'class-validator';
import { UserFerozi } from '../models/user.ferozi.model';

export class DiscardUserFerozi {
  @IsNotEmpty()
  @IsString()
  public feroziID: string;

  @IsNotEmpty()
  @IsString()
  public userID: string;
    

}
