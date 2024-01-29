import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";

export class SendNotificationToAllUsersRequestDTO {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    body: string;

}