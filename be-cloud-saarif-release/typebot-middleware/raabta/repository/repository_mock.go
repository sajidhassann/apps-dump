package repository

import (
	"github.com/stretchr/testify/mock"
	"typebot-middleware/raabta/models"
	global_models "typebot-middleware/shared/models"
)

type MockRaabtaRepository struct {
	mock.Mock
}

func (m *MockRaabtaRepository) SendTextMessage(message string, recipient models.RaabtaRecipient) error {
	args := m.Called(message, recipient)
	return args.Error(0)
}

func (m *MockRaabtaRepository) SendInteractiveMessage(message global_models.InteractiveMessage, recipient models.RaabtaRecipient) error {
	args := m.Called(message, recipient)
	return args.Error(0)
}

func (m *MockRaabtaRepository) SetConversationAttributes(attributes global_models.ConversationCustomAttributes, recipient models.RaabtaRecipient) error {
	args := m.Called(attributes, recipient)
	return args.Error(0)
}
