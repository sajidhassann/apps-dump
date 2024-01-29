//Maximum number of FCM messages that can be sent in a multicast
export const FCM_NOTIFICATION_BATCH_SIZE = 500



//Maxium number of messages that we send at once
export const NOTIFICATION_BATCH_SIZE = FCM_NOTIFICATION_BATCH_SIZE - 25;