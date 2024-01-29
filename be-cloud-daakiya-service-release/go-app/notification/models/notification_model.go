package models

type NotificationModel struct {
	ID         string
	CampaignID *string
	Title      string
	Body       string
	Link       string
}
