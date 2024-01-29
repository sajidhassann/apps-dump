import {NotificationStatus} from "@prisma/client";

export interface NotificationStat {
    count: number
    status: NotificationStatus
    status_code: number
}