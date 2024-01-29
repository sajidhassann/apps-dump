package raabta

import (
	"errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"testing"
	"typebot-middleware/queue"
	"typebot-middleware/raabta/event_validator"
	"typebot-middleware/raabta/models"
	"typebot-middleware/raabta/repository"
	global_models "typebot-middleware/shared/models"
)

func TestRaabtaService_ProcessEvent(t *testing.T) {

	t.Run("Should write a message to queue service", func(t *testing.T) {
		mockEventValidator := &event_validator.MockEventValidatorService{}
		mockQueueService := &queue.MockQueueService{}
		mockRepository := &repository.MockRaabtaRepository{}
		service := NewRaabtaService(mockQueueService, mockEventValidator, mockRepository)

		testEvent := &global_models.Event{
			Conversation: global_models.Conversation{
				Status: "pending",
			},
			Event:       "message_created",
			MessageType: "incoming",
		}

		mockEventValidator.On("ValidateEvent", testEvent).Return(nil)
		mockQueueService.On("Write", mock.Anything, mock.Anything).Return(nil)
		err := service.ProcessEvent(testEvent)
		assert.NoError(t, err)

		mockQueueService.AssertExpectations(t)
	})

	t.Run("Should validate the event before pushing", func(t *testing.T) {
		mockEventValidator := &event_validator.MockEventValidatorService{}
		mockQueueService := &queue.MockQueueService{}
		mockRepository := &repository.MockRaabtaRepository{}

		service := NewRaabtaService(mockQueueService, mockEventValidator, mockRepository)

		testEvent := &global_models.Event{
			Conversation: global_models.Conversation{
				Status: "pending",
			},
			Event:       "message_created",
			MessageType: "incoming",
		}

		mockEventValidator.On("ValidateEvent", testEvent).Return(errors.New("validation error"))
		mockQueueService.On("Write", mock.Anything, mock.Anything).Return(nil)
		service.ProcessEvent(testEvent)

		mockQueueService.AssertNotCalled(t, "Write", mock.Anything, mock.Anything)
		mockEventValidator.AssertExpectations(t)
	})

	t.Run("Should successfully send a text message", func(t *testing.T) {
		mockQueueService := &queue.MockQueueService{}
		mockEventValidator := &event_validator.MockEventValidatorService{}
		mockRepository := &repository.MockRaabtaRepository{}
		service := NewRaabtaService(mockQueueService, mockEventValidator, mockRepository)

		message := "Hello, World!"
		recipient := models.RaabtaRecipient{"1", "1"} // Add recipient details

		mockRepository.On("SendTextMessage", message, recipient).Return(nil)
		err := service.SendTextMessage(message, recipient)
		assert.NoError(t, err)

		mockRepository.AssertExpectations(t)
	})

	t.Run("Should successfully send an interactive message", func(t *testing.T) {
		mockQueueService := &queue.MockQueueService{}
		mockEventValidator := &event_validator.MockEventValidatorService{}
		mockRepository := &repository.MockRaabtaRepository{}
		service := NewRaabtaService(mockQueueService, mockEventValidator, mockRepository)

		message := global_models.InteractiveMessage{}
		recipient := models.RaabtaRecipient{"1", "1"} // Add recipient details

		mockRepository.On("SendInteractiveMessage", message, recipient).Return(nil)
		err := service.SendInteractiveMessage(message, recipient)
		assert.NoError(t, err)

		mockRepository.AssertExpectations(t)
	})

	t.Run("Should set custom attributes for a conversation", func(t *testing.T) {
		mockQueueService := &queue.MockQueueService{}
		mockEventValidator := &event_validator.MockEventValidatorService{}
		mockRepository := &repository.MockRaabtaRepository{}
		service := NewRaabtaService(mockQueueService, mockEventValidator, mockRepository)

		attributes := global_models.ConversationCustomAttributes{}
		recipient := models.RaabtaRecipient{"1", "1"} // Add recipient details

		mockRepository.On("SetConversationAttributes", attributes, recipient).Return(nil)
		err := service.SetCustomAttributes(attributes, recipient)
		assert.NoError(t, err)

		mockRepository.AssertExpectations(t)

	})

}
