package models

import (
	"time"
)

type Event struct {
	Account              Account              `json:"account,omitempty"`
	AdditionalAttributes AdditionalAttributes `json:"additional_attributes,omitempty"`
	ContentAttributes    ContentAttributes    `json:"content_attributes,omitempty"`
	ContentType          string               `json:"content_type,omitempty"`
	Content              string               `json:"content,omitempty"`
	Conversation         Conversation         `json:"conversation,omitempty"`
	CreatedAt            time.Time            `json:"created_at,omitempty"`
	ID                   int                  `json:"id,omitempty"`
	Inbox                Inbox                `json:"inbox,omitempty"`
	MessageType          string               `json:"message_type,omitempty"`
	Private              bool                 `json:"private,omitempty"`
	Sender               Sender               `json:"sender,omitempty"`
	SourceID             string               `json:"source_id,omitempty"`
	Event                string               `json:"event,omitempty"`
}
