import {ArrayNotEmpty, IsArray, IsNotEmpty, IsString} from "class-validator";

export class SendNotificationToUsersRequestDTO {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    body: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({each: true})
    userIDs: string[];


    link?: string;
}