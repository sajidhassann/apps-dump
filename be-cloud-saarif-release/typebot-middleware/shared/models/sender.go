package models

type Sender struct {
	AdditionalAttributes AdditionalAttributes `json:"additional_attributes,omitempty"`
	CustomAttributes     CustomAttributes     `json:"custom_attributes,omitempty"`
	Email                any                  `json:"email,omitempty"`
	ID                   int                  `json:"id,omitempty"`
	Identifier           any                  `json:"identifier,omitempty"`
	Name                 string               `json:"name,omitempty"`
	PhoneNumber          string               `json:"phone_number,omitempty"`
	Thumbnail            string               `json:"thumbnail,omitempty"`
	Type                 string               `json:"type,omitempty"`
}
