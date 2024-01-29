package model

type CampaignNotificationMeta struct {
	ID    string  `json:"id"`
	Title string  `json:"title"`
	Body  string  `json:"body"`
	Link  *string `json:"link,omitempty"`
}
