package event_validator

import (
	"fmt"
	"strconv"
	"strings"
	"typebot-middleware/shared/models"
)

type IEventValidatorService interface {
	ValidateEvent(event *models.Event) error
}

type EventValidatorService struct {
	AgentID string
}

func NewEventValidator(agentID string) IEventValidatorService {
	return EventValidatorService{AgentID: agentID}
}

func (service EventValidatorService) ValidateEvent(event *models.Event) error {
	var errors []string

	if event.Conversation.Status == "open" {
		if event.Conversation.Meta.Assignee == nil {
			errors = append(errors, "Agent is not assigned")
		} else {
			agentIdStringFromEvent := strconv.FormatInt(int64(event.Conversation.Meta.Assignee.ID), 10)
			if err := service.validateCondition("agent id", agentIdStringFromEvent, service.AgentID); err != nil {
				errors = append(errors, err.Error())
			}
		}
	}

	if err := service.validateCondition("message type", event.MessageType, "incoming"); err != nil {
		errors = append(errors, err.Error())
	}
	if err := service.validateCondition("event", event.Event, "message_created"); err != nil {
		errors = append(errors, err.Error())
	}

	if len(errors) > 0 {
		return fmt.Errorf("validation errors: %s", strings.Join(errors, "; "))
	}
	return nil
}

func (service EventValidatorService) validateCondition(field, actualValue, expectedValue string) error {
	if actualValue != expectedValue {
		return fmt.Errorf("%s should be %s", field, expectedValue)
	}
	return nil
}
