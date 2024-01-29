package type_bot

import (
	"github.com/stretchr/testify/mock"
	global_models "typebot-middleware/shared/models"
	"typebot-middleware/type_bot/models"
)

type MockTypeBotService struct {
	mock.Mock
}

func (mock *MockTypeBotService) CreateSession(conversationID string, sessionData global_models.SessionData) (*models.TypeBotSession, error) {
	args := mock.Called(conversationID, sessionData)
	return args.Get(0).(*models.TypeBotSession), args.Error(1)
}

func (mock *MockTypeBotService) SendMessage(sessionID string, message string) (*global_models.TypeBotReply, error) {
	args := mock.Called(sessionID, message)
	return args.Get(0).(*global_models.TypeBotReply), args.Error(1)
}
