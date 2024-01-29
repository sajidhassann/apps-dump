package raabta

import (
	"github.com/stretchr/testify/mock"
	"typebot-middleware/raabta/models"
	global_models "typebot-middleware/shared/models"
)

type MockRaabtaService struct {
	mock.Mock
}

func (m *MockRaabtaService) SetCustomAttributes(attributes global_models.ConversationCustomAttributes, recipient models.RaabtaRecipient) error {
	args := m.Called(attributes, recipient)
	return args.Error(0)
}

func (m *MockRaabtaService) ProcessEvent(event *global_models.Event) error {
	args := m.Called(event)
	return args.Error(0)
}

func (m *MockRaabtaService) SendTextMessage(message string, recipient models.RaabtaRecipient) error {
	args := m.Called(message, recipient)
	return args.Error(0)
}

func (m *MockRaabtaService) SendInteractiveMessage(message global_models.InteractiveMessage, recipient models.RaabtaRecipient) error {
	args := m.Called(message, recipient)
	return args.Error(0)
}
