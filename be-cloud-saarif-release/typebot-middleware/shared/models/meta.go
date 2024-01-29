package models

type Meta struct {
	Sender       Sender    `json:"sender,omitempty"`
	Assignee     *Assignee `json:"assignee,omitempty"`
	Team         any       `json:"team,omitempty"`
	HmacVerified bool      `json:"hmac_verified,omitempty"`
}
