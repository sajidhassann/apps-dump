package models

type Assignee struct {
	ID                 int    `json:"id,omitempty"`
	Name               string `json:"name,omitempty"`
	AvailableName      string `json:"available_name,omitempty"`
	AvatarURL          string `json:"avatar_url,omitempty"`
	Type               string `json:"type,omitempty"`
	AvailabilityStatus any    `json:"availability_status,omitempty"`
	Thumbnail          string `json:"thumbnail,omitempty"`
}
