package models

type NotificationMeta struct {
	ID    string  `json:"id"`
	Title string  `json:"title"`
	Body  string  `json:"body"`
	Link  *string `json:"link,omitempty"`
}
