package middleware

import (
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"testing"
	"typebot-middleware/middleware/message_parser"
	"typebot-middleware/queue"
	"typebot-middleware/raabta"
	global_models "typebot-middleware/shared/models"
	"typebot-middleware/type_bot"
	typebot_models "typebot-middleware/type_bot/models"
)

func TestMiddlewareService_ProcessIncomingMessageEvent(t *testing.T) {
	// Mocking all dependencies
	mockQueue := new(queue.MockQueueService)
	mockTypeBot := new(type_bot.MockTypeBotService)
	mockRaabta := new(raabta.MockRaabtaService)
	mockMessageParser := new(message_parser.MockMessageParserService)

	service := NewMiddlewareService(mockQueue, mockTypeBot, mockRaabta, mockMessageParser)

	t.Run("Should get a new session if the session is not present", func(t *testing.T) {
		event := global_models.Event{
			Conversation: global_models.Conversation{
				ID: 123,
				CustomAttributes: global_models.ConversationCustomAttributes{
					TypeBotSessionID: nil,
				},
			},
			Account: global_models.Account{ID: 456},
			Content: "Test Message",
		}
		newSession := "new_session_id"
		reply := global_models.TypeBotReply{}

		mockTypeBot.On("CreateSession", mock.Anything, mock.Anything).Return(&typebot_models.TypeBotSession{SessionID: newSession}, nil)
		mockTypeBot.On("SendMessage", newSession, event.Content).Return(&reply, nil)
		mockRaabta.On("SetCustomAttributes", mock.Anything, mock.Anything).Return(nil)
		mockRaabta.On("SendReply", mock.Anything, mock.Anything).Return(nil)

		err := service.ProcessIncomingMessageEvent(event)
		assert.NoError(t, err)

		mockTypeBot.AssertCalled(t, "CreateSession", mock.Anything, mock.Anything)

	})

	t.Run("Should update the session in custom attributes of conversation if not present", func(t *testing.T) {
		event := global_models.Event{
			Conversation: global_models.Conversation{
				ID: 123,
				CustomAttributes: global_models.ConversationCustomAttributes{
					TypeBotSessionID: nil,
				},
			},
			Account: global_models.Account{ID: 456},
			Content: "Test Message",
		}
		newSession := "new_session_id"
		reply := global_models.TypeBotReply{}

		mockTypeBot.On("CreateSession", mock.Anything, mock.Anything).Return(&typebot_models.TypeBotSession{SessionID: newSession}, nil)
		mockRaabta.On("SetCustomAttributes", mock.Anything, mock.Anything).Return(nil)
		mockRaabta.On("SendReply", mock.Anything, mock.Anything).Return(nil)
		mockTypeBot.On("SendMessage", newSession, event.Content).Return(&reply, nil)
		_ = service.ProcessIncomingMessageEvent(event)

		mockRaabta.AssertCalled(t, "SetCustomAttributes", mock.Anything, mock.Anything)
	})

	t.Run("Should send a message to the session ID to type bot", func(t *testing.T) {
		existingSessionID := "existing_session_id"
		event := global_models.Event{
			Conversation: global_models.Conversation{
				ID: 123,
				CustomAttributes: global_models.ConversationCustomAttributes{
					TypeBotSessionID: &existingSessionID,
				},
			},
			Account: global_models.Account{ID: 456},
			Content: "Test Message",
		}
		reply := global_models.TypeBotReply{}

		mockTypeBot.On("SendMessage", *event.Conversation.CustomAttributes.TypeBotSessionID, event.Content).Return(&reply, nil)

		err := service.ProcessIncomingMessageEvent(event)
		assert.NoError(t, err)

		mockTypeBot.AssertCalled(t, "SendMessage", *event.Conversation.CustomAttributes.TypeBotSessionID, event.Content)
	})

}
