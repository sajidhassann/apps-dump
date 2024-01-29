package models

import "time"

type ContactInbox struct {
	ID           int       `json:"id,omitempty"`
	ContactID    int       `json:"contact_id,omitempty"`
	InboxID      int       `json:"inbox_id,omitempty"`
	SourceID     string    `json:"source_id,omitempty"`
	CreatedAt    time.Time `json:"created_at,omitempty"`
	UpdatedAt    time.Time `json:"updated_at,omitempty"`
	HmacVerified bool      `json:"hmac_verified,omitempty"`
	PubsubToken  string    `json:"pubsub_token,omitempty"`
}
