import {NotificationStatus} from "./notification.status";

export interface UpdateNotificationStatus {
    id: string
    status: NotificationStatus
    fcmMessageID: string
}