package models

import "time"

type Conversation struct {
	AdditionalAttributes AdditionalAttributes         `json:"additional_attributes,omitempty"`
	CanReply             bool                         `json:"can_reply,omitempty"`
	Channel              string                       `json:"channel,omitempty"`
	ContactInbox         ContactInbox                 `json:"contact_inbox,omitempty"`
	ID                   int                          `json:"id,omitempty"`
	InboxID              int                          `json:"inbox_id,omitempty"`
	Messages             []Message                    `json:"messages,omitempty"`
	Labels               []any                        `json:"labels,omitempty"`
	Meta                 Meta                         `json:"meta,omitempty"`
	Status               string                       `json:"status,omitempty"`
	CustomAttributes     ConversationCustomAttributes `json:"custom_attributes,omitempty"`
	SnoozedUntil         any                          `json:"snoozed_until,omitempty"`
	UnreadCount          int                          `json:"unread_count,omitempty"`
	FirstReplyCreatedAt  time.Time                    `json:"first_reply_created_at,omitempty"`
	Priority             any                          `json:"priority,omitempty"`
	WaitingSince         int                          `json:"waiting_since,omitempty"`
	AgentLastSeenAt      int                          `json:"agent_last_seen_at,omitempty"`
	ContactLastSeenAt    int                          `json:"contact_last_seen_at,omitempty"`
	Timestamp            int                          `json:"timestamp,omitempty"`
	CreatedAt            int                          `json:"created_at,omitempty"`
}

type ConversationCustomAttributes struct {
	TypeBotSessionID *string `json:"TypeBot Session,omitempty"`
}
