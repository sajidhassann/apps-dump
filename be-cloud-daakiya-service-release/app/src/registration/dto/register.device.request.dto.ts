import { IsNotEmpty } from "class-validator";

export class RegisterDeviceRequestDTO {
  @IsNotEmpty()
  token: string;

  userID: string | null;

}