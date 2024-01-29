package models

import "time"

type Message struct {
	ID                      int                  `json:"id,omitempty"`
	Content                 string               `json:"content,omitempty"`
	AccountID               int                  `json:"account_id,omitempty"`
	InboxID                 int                  `json:"inbox_id,omitempty"`
	ConversationID          int                  `json:"conversation_id,omitempty"`
	MessageType             int                  `json:"message_type,omitempty"`
	CreatedAt               int                  `json:"created_at,omitempty"`
	UpdatedAt               time.Time            `json:"updated_at,omitempty"`
	Private                 bool                 `json:"private,omitempty"`
	Status                  string               `json:"status,omitempty"`
	SourceID                string               `json:"source_id,omitempty"`
	ContentType             string               `json:"content_type,omitempty"`
	ContentAttributes       ContentAttributes    `json:"content_attributes,omitempty"`
	SenderType              string               `json:"sender_type,omitempty"`
	SenderID                int                  `json:"sender_id,omitempty"`
	ExternalSourceIds       ExternalSourceIds    `json:"external_source_ids,omitempty"`
	AdditionalAttributes    AdditionalAttributes `json:"additional_attributes,omitempty"`
	ProcessedMessageContent string               `json:"processed_message_content,omitempty"`
	Sentiment               Sentiment            `json:"sentiment,omitempty"`
	Conversation            MessageConversation  `json:"conversation,omitempty"`
	Sender                  Sender               `json:"sender,omitempty"`
}
