package message_parser

import (
	"github.com/stretchr/testify/mock"
	global_models "typebot-middleware/shared/models"
)

type MockMessageParserService struct {
	mock.Mock
}

func (m *MockMessageParserService) ParseMessage(message *global_models.TypeBotMessage) (*string, error) {
	args := m.Called(message)
	return args.Get(0).(*string), args.Error(1)
}

func (m *MockMessageParserService) ParseInputMessage(message *global_models.TypebotInputMessage) (*global_models.InteractiveMessage, error) {
	args := m.Called(message)
	return args.Get(0).(*global_models.InteractiveMessage), args.Error(1)
}
