package event_validator

import (
	"github.com/stretchr/testify/mock"
	"typebot-middleware/shared/models"
)

type MockEventValidatorService struct {
	mock.Mock
}

func (mock *MockEventValidatorService) ValidateEvent(event *models.Event) error {
	args := mock.Called(event)
	return args.Error(0)
}
