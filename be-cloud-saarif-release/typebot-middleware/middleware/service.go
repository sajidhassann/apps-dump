package middleware

import (
	"fmt"
	"github.com/goccy/go-json"
	"typebot-middleware/middleware/message_parser"
	"typebot-middleware/queue"
	queue_models "typebot-middleware/queue/models"
	"typebot-middleware/raabta"
	raabta_models "typebot-middleware/raabta/models"
	"typebot-middleware/shared/constants"
	global_models "typebot-middleware/shared/models"
	"typebot-middleware/type_bot"
)

type IMiddlewareService interface {
	ListenForEvents()
	ProcessIncomingMessageEvent(event global_models.Event) error
	SendReply(recipient raabta_models.RaabtaRecipient, reply global_models.TypeBotReply) error
}

type MiddlewareService struct {
	queue         queue.IQueueService
	typeBot       type_bot.ITypeBotService
	raabta        raabta.IRaabtaService
	messageParser message_parser.IMessageParserService
}

func NewMiddlewareService(queue queue.IQueueService, typeBot type_bot.ITypeBotService, raabta raabta.IRaabtaService, messageParser message_parser.IMessageParserService) MiddlewareService {
	var service = MiddlewareService{queue, typeBot, raabta, messageParser}
	return service
}

func (service MiddlewareService) ProcessIncomingMessageEvent(event global_models.Event) error {

	recipient := raabta_models.RaabtaRecipient{
		ConversationID: fmt.Sprintf("%d", event.Conversation.ID),
		AccountID:      fmt.Sprintf("%d", event.Account.ID),
	}
	sessionData := global_models.SessionData{
		ConversationID: recipient.ConversationID,
		AccountID:      recipient.AccountID,
		PhoneNumber:    event.Conversation.Meta.Sender.PhoneNumber,
		InitialMessage: event.Content,
	}

	sessionID := event.Conversation.CustomAttributes.TypeBotSessionID

	if sessionID == nil {
		newSession, err := service.typeBot.CreateSession(recipient.ConversationID, sessionData)
		sessionID = &newSession.SessionID
		event.Conversation.CustomAttributes.TypeBotSessionID = &newSession.SessionID
		err = service.raabta.SetCustomAttributes(event.Conversation.CustomAttributes, recipient)
		if err != nil {
			return err
		}

	}

	if sessionID == nil {
		return fmt.Errorf("Error creating session for conversation %d", event.Conversation.ID)
	}
	reply, err := service.typeBot.SendMessage(*sessionID, event.Content)
	if err != nil {
		return err
	}

	fmt.Println("Reply", reply)
	fmt.Println("Error", err)

	if err := service.SendReply(recipient, *reply); err != nil {
		return err
	}

	return nil
}

func (service MiddlewareService) ListenForEvents() {

	go func() {
		for {
			service.queue.Read(constants.RAABTA_EVENT_CHANNEL, service.processMessage, 1)
		}
	}()

}

func (service MiddlewareService) processMessage(message queue_models.QueueMessage, cb func()) {
	var event global_models.Event
	if err := json.Unmarshal(message.Value, &event); err != nil {
		fmt.Println(err)
	}
	if err := service.ProcessIncomingMessageEvent(event); err != nil {
		fmt.Println(err)
	}
	cb()
}

func (service MiddlewareService) SendReply(recipient raabta_models.RaabtaRecipient, typeBotReply global_models.TypeBotReply) error {

	for _, message := range typeBotReply.Messages {
		parsedMessage, err := service.messageParser.ParseMessage(&message)
		if err != nil {
			fmt.Println(err)
		}
		if err := service.raabta.SendTextMessage(*parsedMessage, recipient); err != nil {
			fmt.Println(err)
		}
	}

	if typeBotReply.Input != nil {
		parsedMessage, err := service.messageParser.ParseInputMessage(typeBotReply.Input)
		if err != nil {
			fmt.Println(err)

		}
		if err := service.raabta.SendInteractiveMessage(*parsedMessage, recipient); err != nil {
			fmt.Println(err)
		}

	}

	return nil
}
