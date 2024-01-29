package models

type MessageConversation struct {
	AssigneeID     int          `json:"assignee_id,omitempty"`
	UnreadCount    int          `json:"unread_count,omitempty"`
	LastActivityAt int          `json:"last_activity_at,omitempty"`
	ContactInbox   ContactInbox `json:"contact_inbox,omitempty"`
}
