package models

type SessionData struct {
	ConversationID string `json:"conversationID"`
	AccountID      string `json:"accountID"`
	PhoneNumber    string `json:"phoneNumber"`
	InitialMessage string `json:"initialMessage"`
}
