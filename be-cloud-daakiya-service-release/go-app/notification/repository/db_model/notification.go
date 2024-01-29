package db_model

type Notification struct {
	UserID             string
	Token              string
	MetaID             string
	FcmMessageID       string
	FcmErrorStatus     string
	FcmErrorCode       string
	FcmErrorReason     string
	FcmErrorDetails    string
	NotificationStatus NotificationStatus
}
