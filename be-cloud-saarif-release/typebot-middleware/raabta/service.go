package raabta

import (
	"encoding/json"
	"github.com/google/uuid"
	"typebot-middleware/queue"
	queue_models "typebot-middleware/queue/models"
	"typebot-middleware/raabta/event_validator"
	"typebot-middleware/raabta/models"
	"typebot-middleware/raabta/repository"
	"typebot-middleware/shared/constants"
	global_models "typebot-middleware/shared/models"
)

type IRaabtaService interface {
	ProcessEvent(event *global_models.Event) error
	SendTextMessage(message string, recipient models.RaabtaRecipient) error
	SendInteractiveMessage(message global_models.InteractiveMessage, recipient models.RaabtaRecipient) error
	SetCustomAttributes(attributes global_models.ConversationCustomAttributes, recipient models.RaabtaRecipient) error
}

type RaabtaService struct {
	queue          queue.IQueueService
	eventValidator event_validator.IEventValidatorService
	repository     repository.IRaabtaRepository
}

func NewRaabtaService(queue queue.IQueueService, eventValidator event_validator.IEventValidatorService, repository repository.IRaabtaRepository) IRaabtaService {
	var service = RaabtaService{queue, eventValidator, repository}
	return service
}

func (service RaabtaService) ProcessEvent(event *global_models.Event) error {
	if err := service.eventValidator.ValidateEvent(event); err != nil {
		return err
	}
	eventJson, err := json.Marshal(event)
	if err != nil {
		return err
	}

	message := queue_models.QueueMessage{ID: uuid.New().String(), Value: eventJson}
	service.queue.Write(constants.RAABTA_EVENT_CHANNEL, []queue_models.QueueMessage{message})
	return nil
}

func (service RaabtaService) SendTextMessage(message string, recipient models.RaabtaRecipient) error {

	if err := service.repository.SendTextMessage(message, recipient); err != nil {
		return err
	}
	return nil
}

func (service RaabtaService) SendInteractiveMessage(message global_models.InteractiveMessage, recipient models.RaabtaRecipient) error {

	if err := service.repository.SendInteractiveMessage(message, recipient); err != nil {
		return err
	}
	return nil
}

func (service RaabtaService) SetCustomAttributes(attributes global_models.ConversationCustomAttributes, recipient models.RaabtaRecipient) error {
	if err := service.repository.SetConversationAttributes(attributes, recipient); err != nil {
		return err
	}

	return nil
}



