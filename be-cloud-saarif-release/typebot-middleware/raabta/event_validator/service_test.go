package event_validator

import (
	"github.com/stretchr/testify/assert"
	"testing"
	models2 "typebot-middleware/shared/models"
)

func TestValidation(t *testing.T) {
	//t.Run("Conversation Agent Account Assigned', Test_Conversation_Status)
	t.Run("Event Status Tests", Test_Event_Status)
	t.Run("Message Type Tests", Test_Message_Type)
	t.Run("Check If The Chat Is Assigned To Agent", Test_Message_Type)

}

func Test_Chat_Is_Assigned_To_AgentAccount(t *testing.T) {
	validator := NewEventValidator("1")
	event := models2.Event{
		Conversation: models2.Conversation{
			Status: "open",
			Meta: models2.Meta{Assignee: &models2.Assignee{
				ID: 1,
			}},
		},
		Event:       "message_created",
		MessageType: "incoming",
	}

	t.Run("Should return nil if conversation is assigned to bot agent id and chat is in open state", func(t *testing.T) {
		err := validator.ValidateEvent(&event)
		assert.NoError(t, err)
	})

	event.Conversation.Meta.Assignee.ID = 2

	t.Run("Should return error if conversation is assigned to any other account id expect bot agent id and chat is in open state", func(t *testing.T) {
		err := validator.ValidateEvent(&event)
		assert.Error(t, err)
	})

	event.Conversation.Meta.Assignee = nil

	t.Run("Should return error if conversation is un-assigned and chat is in open state", func(t *testing.T) {
		err := validator.ValidateEvent(&event)
		assert.Error(t, err)
	})

	event.Conversation.Status = "pending"

	t.Run("Should not return error if conversation is un-assigned and chat is in pending state", func(t *testing.T) {
		err := validator.ValidateEvent(&event)
		assert.NoError(t, err)
	})
}

func Test_Event_Status(t *testing.T) {
	validator := NewEventValidator("1")

	event := models2.Event{
		Conversation: models2.Conversation{
			Status: "open",
			Meta: models2.Meta{Assignee: &models2.Assignee{
				ID: 1,
			}},
		},
		Event:       "message_created",
		MessageType: "incoming",
	}

	t.Run("Should return nil if event is message_created", func(t *testing.T) {
		err := validator.ValidateEvent(&event)
		assert.NoError(t, err)
	})

	event.Event = "message_updated"

	t.Run("Should return error if event is not message_created", func(t *testing.T) {
		err := validator.ValidateEvent(&event)
		assert.Error(t, err)
	})

}

func Test_Message_Type(t *testing.T) {
	validator := NewEventValidator("1")

	event := models2.Event{
		Conversation: models2.Conversation{
			Status: "open",
			Meta: models2.Meta{Assignee: &models2.Assignee{
				ID: 1,
			}},
		},
		Event:       "message_created",
		MessageType: "incoming",
	}

	t.Run("Should return nil if message type is incoming", func(t *testing.T) {
		err := validator.ValidateEvent(&event)
		assert.NoError(t, err)
	})

	event.MessageType = "outgoing"

	t.Run("Should return error if message type is not incoming", func(t *testing.T) {
		err := validator.ValidateEvent(&event)
		assert.Error(t, err)
	})
}
