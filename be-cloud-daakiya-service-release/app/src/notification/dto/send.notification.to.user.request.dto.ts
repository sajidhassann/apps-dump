import {IsNotEmpty} from "class-validator";

export class SendNotificationToUserRequestDTO {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    body: string;
    @IsNotEmpty()
    userID: string;
    link?: string;
}