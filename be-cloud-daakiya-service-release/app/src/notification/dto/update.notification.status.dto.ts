import {IsIn, IsNotEmpty} from 'class-validator';
import {NotificationStatus} from "../models/notification.status";

export class UpdateNotificationStatusRequestDTO {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    @IsIn([NotificationStatus.RECEIVED, NotificationStatus.OPEN])
    status: NotificationStatus.RECEIVED | NotificationStatus.OPEN;

    @IsNotEmpty()
    fcmMessageID: string
}
