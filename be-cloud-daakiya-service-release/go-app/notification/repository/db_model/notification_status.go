package db_model

type NotificationStatus string

const (
	Pending  NotificationStatus = "PENDING"
	Sent     NotificationStatus = "SENT"
	Failed   NotificationStatus = "FAILED"
	Received NotificationStatus = "RECEIVED"
	Opened   NotificationStatus = "OPENED"
)
