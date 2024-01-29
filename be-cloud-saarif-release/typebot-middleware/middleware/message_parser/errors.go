package message_parser

import "fmt"

// Custom error strings
const (
	UnsupportedMessageTypeError    = "unsupported message type: %s"
	UnsupportedMessageContentError = "unsupported message content"
)

// NewUnsupportedMessageType creates a new error for unsupported message types.
func NewUnsupportedMessageType(messageType string) error {
	return fmt.Errorf(UnsupportedMessageTypeError, messageType)
}

// NewUnsupportedMessageContent creates a new error for unsupported message contents.
func NewUnsupportedMessageContent() error {
	return fmt.Errorf(UnsupportedMessageContentError)
}
