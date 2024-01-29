package message_parser

import (
	"fmt"
	"github.com/stretchr/testify/assert"
	"testing"
	"typebot-middleware/shared/models"
)

func Test_ParseMessage(t *testing.T) {
	service := NewMessageParserService()

	t.Run("Should parse valid rich text message", func(t *testing.T) {
		message := &models.TypeBotMessage{
			Type: "text",
			Content: models.Content{
				RichText: []models.RichText{
					{
						Children: []models.Children{
							{Bold: true, Text: "Bold"},
							{Text: " and "},
							{Italic: true, Text: "Italic"},
						},
					},
				},
			},
		}
		expected := "*Bold* and _Italic_"
		result, err := service.ParseMessage(message)

		assert.NoError(t, err)
		assert.Equal(t, expected, *result)
	})

	t.Run("Should return error for non-text message type", func(t *testing.T) {
		message := &models.TypeBotMessage{Type: "image"}
		result, err := service.ParseMessage(message)

		assert.Error(t, err)
		assert.Nil(t, result)
	})

	t.Run("Should return an error if there's no rich text message", func(t *testing.T) {
		message := &models.TypeBotMessage{
			Type:    "text",
			Content: models.Content{},
		}
		result, err := service.ParseMessage(message)

		assert.Error(t, err)
		assert.Nil(t, result)
	})

	t.Run("Should apply bold formatting", func(t *testing.T) {
		message := &models.TypeBotMessage{
			Type: "text",
			Content: models.Content{
				RichText: []models.RichText{
					{Children: []models.Children{{Bold: true, Text: "Bold Text"}}},
				},
			},
		}
		expected := "*Bold Text*"
		result, err := service.ParseMessage(message)

		assert.NoError(t, err)
		assert.Equal(t, expected, *result)
	})

	t.Run("Should apply italics formatting", func(t *testing.T) {
		message := &models.TypeBotMessage{
			Type: "text",
			Content: models.Content{
				RichText: []models.RichText{
					{Children: []models.Children{{Italic: true, Text: "Italic Text"}}},
				},
			},
		}
		expected := "_Italic Text_"
		result, err := service.ParseMessage(message)

		assert.NoError(t, err)
		assert.Equal(t, expected, *result)
	})

	t.Run("Should handle URL formatting", func(t *testing.T) {
		message := &models.TypeBotMessage{
			Type: "text",
			Content: models.Content{
				RichText: []models.RichText{
					{Children: []models.Children{{URL: "https://example.com"}}},
				},
			},
		}
		expected := ""
		result, err := service.ParseMessage(message)

		assert.NoError(t, err)
		assert.Equal(t, expected, *result)
	})

	t.Run("Should add line breaks between two rich texts", func(t *testing.T) {
		message := &models.TypeBotMessage{
			Type: "text",
			Content: models.Content{
				RichText: []models.RichText{
					{Children: []models.Children{{Text: "First Rich Text"}}},
					{Children: []models.Children{{Text: "Second Rich Text"}}},
				},
			},
		}
		expected := "First Rich Text\nSecond Rich Text"
		result, err := service.ParseMessage(message)

		assert.NoError(t, err)
		assert.Equal(t, expected, *result)
	})

	t.Run("Should parse text with mixed bold and italic formatting", func(t *testing.T) {
		message := &models.TypeBotMessage{
			Type: "text",
			Content: models.Content{
				RichText: []models.RichText{
					{
						Children: []models.Children{
							{Bold: true, Text: "Bold:"},
							{Text: " "},
							{
								Type: "inline-variable",
								Children: []models.Children{
									{
										Type: "p",
										Children: []models.Children{
											{Text: "Normal, "},
										},
									},
								},
							},
							{Italic: true, Text: "Italic"},
						},
					},
				},
			},
		}
		expected := "*Bold:* Normal, _Italic_"
		result, err := service.ParseMessage(message)

		assert.NoError(t, err)
		assert.Equal(t, expected, *result)
	})

	t.Run("Should parse inline variables correctly", func(t *testing.T) {
		message := &models.TypeBotMessage{
			Type: "text",
			Content: models.Content{
				RichText: []models.RichText{
					{
						Children: []models.Children{
							{Text: "grade: "},
							{
								Type: "inline-variable",
								Children: []models.Children{
									{
										Type: "p",
										Children: []models.Children{
											{Text: "X"},
										},
									},
								},
							},
						},
					},
				},
			},
		}
		expected := "grade: X"
		result, err := service.ParseMessage(message)

		assert.NoError(t, err)
		assert.Equal(t, expected, *result)
	})

	t.Run("Should parse choice input message", func(t *testing.T) {
		message := &models.TypebotInputMessage{
			Type: "choice input",
			Items: []models.Items{
				{Content: "Option 1"},
				{Content: "Option 2"},
			},
		}
		expected := &models.InteractiveMessage{
			Message: "Ek option select karain",
			Options: []string{"Option 1", "Option 2"},
		}
		result, err := service.ParseInputMessage(message)

		assert.NoError(t, err)
		assert.Equal(t, expected, result)
	})

	t.Run("Should parse choice input message", func(t *testing.T) {
		message := &models.TypebotInputMessage{
			Type: "choice input",
			Items: []models.Items{
				{Content: "Option 1"},
				{Content: "Option 2"},
			},
		}
		expected := &models.InteractiveMessage{
			Message: "Ek option select karain",
			Options: []string{"Option 1", "Option 2"},
		}
		result, err := service.ParseInputMessage(message)

		assert.NoError(t, err)
		assert.Equal(t, expected, result)
	})

	t.Run("Should remove the input option where option char length is greater than 20", func(t *testing.T) {
		message := &models.TypebotInputMessage{
			Type: "choice input",
			Items: []models.Items{
				{Content: "Option 1"},
				{Content: "Option 2"},
				{Content: "This is a message that is greater than 20 char"},
			},
		}
		expected := &models.InteractiveMessage{
			Message: "Ek option select karain",
			Options: []string{"Option 1", "Option 2"},
		}
		result, err := service.ParseInputMessage(message)

		assert.NoError(t, err)
		assert.Equal(t, expected, result)
	})

	t.Run("Should return error for unsupported message type", func(t *testing.T) {
		message := &models.TypebotInputMessage{Type: "image input"}
		result, err := service.ParseInputMessage(message)

		expectedErr := fmt.Errorf(UnsupportedMessageTypeError, "image input")

		assert.EqualError(t, err, expectedErr.Error())
		assert.Nil(t, result)
	})

}
