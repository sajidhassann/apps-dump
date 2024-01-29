package message_parser

import (
	"fmt"
	"strings"
	"typebot-middleware/shared/models"
)

type IMessageParserService interface {
	ParseMessage(message *models.TypeBotMessage) (*string, error)
	ParseInputMessage(message *models.TypebotInputMessage) (*models.InteractiveMessage, error)
}

type MessageParserService struct{}

func NewMessageParserService() MessageParserService {
	return MessageParserService{}
}

func (service MessageParserService) ParseMessage(message *models.TypeBotMessage) (*string, error) {
	if message.Type != "text" {
		return nil, fmt.Errorf("Unsupported message type: %s", message.Type)
	}

	if len(message.Content.RichText) > 0 {
		parsedMessage := parseRichTextMessage(message.Content.RichText)
		return &parsedMessage, nil
	}

	return nil, fmt.Errorf("Unsupported message content")
}

func parseRichTextMessage(richTexts []models.RichText) string {
	var outgoingMessage strings.Builder
	for i, richText := range richTexts {
		outgoingMessage.WriteString(parseRichTextChildren(richText.Children))
		if i < len(richTexts)-1 {
			outgoingMessage.WriteString("\n")
		}
	}
	return outgoingMessage.String()
}

func parseRichTextChildren(children []models.Children) string {
	var parsedText strings.Builder
	for _, child := range children {
		parsedText.WriteString(applyFormatting(child))
	}
	return parsedText.String()
}

func applyFormatting(child models.Children) string {
	var formattedText strings.Builder

	// Check and apply bold and italic formatting
	if child.Bold && child.Italic && child.Text != "" {
		// Both bold and italic
		formattedText.WriteString("*_")
		formattedText.WriteString(child.Text)
		formattedText.WriteString("_*")
	} else if child.Bold && child.Text != "" {
		// Only bold
		formattedText.WriteString("*")
		formattedText.WriteString(child.Text)
		formattedText.WriteString("*")
	} else if child.Italic && child.Text != "" {
		// Only italic
		formattedText.WriteString("_")
		formattedText.WriteString(child.Text)
		formattedText.WriteString("_")
	} else {
		// No formatting
		formattedText.WriteString(child.Text)
	}

	// Handle URL formatting
	if child.URL != "" {
		formattedText.WriteString("")
	}

	// Recursively apply formatting for nested children
	for _, nestedChild := range child.Children {
		formattedText.WriteString(applyFormatting(nestedChild))
	}

	return formattedText.String()
}

func (service MessageParserService) ParseInputMessage(message *models.TypebotInputMessage) (*models.InteractiveMessage, error) {
	if message.Type != "choice input" {
		return nil, NewUnsupportedMessageType(message.Type)
	}

	var options []string
	for _, item := range message.Items {
		if len(item.Content) <= 20 {
			options = append(options, item.Content)
		}

	}

	interactiveMessage := &models.InteractiveMessage{
		Message: "Ek option select karain",
		Options: options,
	}

	return interactiveMessage, nil
}
