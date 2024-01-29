package type_bot

import (
	"fmt"
	"gopkg.in/resty.v1"
	"os"
	global_models "typebot-middleware/shared/models"
	"typebot-middleware/type_bot/models"
)

type ITypeBotService interface {
	CreateSession(conversationID string, sessionData global_models.SessionData) (*models.TypeBotSession, error)
	SendMessage(sessionID string, message string) (*global_models.TypeBotReply, error)
}

type TypeBotService struct {
	flowID  string
	baseUrl string
}

func NewTypeBotService() ITypeBotService {
	var service = TypeBotService{flowID: os.Getenv("TYPEBOT_FLOW_ID"), baseUrl: os.Getenv("TYPEBOT_BASE_URL")}
	return service
}

func (service TypeBotService) CreateSession(conversationID string, sessionData global_models.SessionData) (*models.TypeBotSession, error) {
	reqUrl := service.baseUrl + "/v1/typebots/" + service.flowID + "/startChat"
	payload := map[string]interface{}{
		"isOnlyRegistering":  true,
		"prefilledVariables": sessionData,
	}
	var sessionResponse models.TypeBotSession
	var errorResponse models.TypeBotError
	resp, err := resty.New().R().
		SetHeader("Content-Type", "application/json").
		SetBody(payload).
		SetResult(&sessionResponse).
		SetError(&errorResponse).
		Post(reqUrl)

	if err != nil {
		fmt.Println("Error", err)
		return nil, err
	}

	if resp.IsError() {
		return nil, fmt.Errorf("Error creating session for conversation %s. Error: %s. Code: %s, Issues: %s", conversationID, errorResponse.Message, errorResponse.Code, errorResponse.Issues)
	}

	return &sessionResponse, nil
}

func (service TypeBotService) SendMessage(sessionID string, message string) (*global_models.TypeBotReply, error) {
	reqUrl := service.baseUrl + "/v1/sessions/" + sessionID + "/continueChat"
	payload := map[string]interface{}{
		"message": message,
	}

	var replyResponse global_models.TypeBotReply
	var errorResponse models.TypeBotError
	resp, err := resty.New().R().
		SetHeader("Content-Type", "application/json").
		SetBody(payload).
		SetResult(&replyResponse).
		SetError(&errorResponse).
		Post(reqUrl)

	if err != nil {
		return nil, err
	}

	if resp.IsError() {
		return nil, fmt.Errorf(errorResponse.Message)
	}

	return &replyResponse, nil
}
