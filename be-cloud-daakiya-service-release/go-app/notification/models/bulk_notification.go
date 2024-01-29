package models

type BulkNotification struct {
	NotificationMeta NotificationMeta   `json:"notification_meta"`
	Users            []NotificationUser `json:"users"`
}
