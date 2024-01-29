package dto

type NotificationPayload struct {
	Title string `json:"title"`
	Body  string `json:"body"`
	Link  string `json:"link"`
}

type CreateCampaignDTO struct {
	Name                string              `json:"name"`
	NotificationPayload NotificationPayload `json:"notificationPayload"`
}
