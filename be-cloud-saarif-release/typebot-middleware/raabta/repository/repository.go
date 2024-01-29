package repository

import (
	"fmt"
	"gopkg.in/resty.v1"
	"os"
	"typebot-middleware/raabta/models"
	global_models "typebot-middleware/shared/models"
)

type IRaabtaRepository interface {
	SendTextMessage(message string, recipient models.RaabtaRecipient) error
	SendInteractiveMessage(message global_models.InteractiveMessage, recipient models.RaabtaRecipient) error
	SetConversationAttributes(attributes global_models.ConversationCustomAttributes, recipient models.RaabtaRecipient) error
}

type RaabtaRepository struct {
	baseUrl        string
	botAccessToken string
}

func NewRaabtaRepository() IRaabtaRepository {
	var service = RaabtaRepository{os.Getenv("RAABTA_API_URL"), os.Getenv("RAABTA_BOT_ACCESS_TOKEN")}
	return service
}

func (service RaabtaRepository) SendTextMessage(message string, recipient models.RaabtaRecipient) error {
	client := resty.New()

	fmt.Println("SendTextMessage: api_access_token : %v", service.botAccessToken)

	body := map[string]interface{}{
		"content": message,
		"private": false,
	}

	_, err := client.R().
		SetHeader("Content-Type", "application/json").
		SetHeader("api_access_token", service.botAccessToken).
		SetBody(body).
		Post(service.getReqURL(recipient, "messages"))

	if err != nil {
		return err
	}

	return nil
}

func (service RaabtaRepository) SendInteractiveMessage(message global_models.InteractiveMessage, recipient models.RaabtaRecipient) error {
	client := resty.New()

	fmt.Println("SendInteractiveMessage: api_access_token : %v", service.botAccessToken)

	body := map[string]interface{}{
		"content":      message.Message,
		"content_type": "input_select",
		"content_attributes": map[string]interface{}{
			"items": []map[string]string{},
		},
		"private": false,
	}

	for _, option := range message.Options {
		body["content_attributes"].(map[string]interface{})["items"] = append(
			body["content_attributes"].(map[string]interface{})["items"].([]map[string]string),
			map[string]string{"title": option, "value": option},
		)
	}

	_, err := client.R().
		SetHeader("Content-Type", "application/json").
		SetHeader("api_access_token", service.botAccessToken).
		SetBody(body).
		Post(service.getReqURL(recipient, "messages"))

	if err != nil {
		return err
	}

	return nil
}

func (service RaabtaRepository) SetConversationAttributes(attributes global_models.ConversationCustomAttributes, recipient models.RaabtaRecipient) error {
	client := resty.New()

	fmt.Println("SetConversationAttributes: api_access_token : %v", service.botAccessToken)

	custom_attributes := map[string]interface{}{}

	if attributes.TypeBotSessionID != nil {
		custom_attributes["TypeBot Session"] = *attributes.TypeBotSessionID
	}

	body := map[string]interface{}{
		"custom_attributes": custom_attributes,
	}

	fmt.Println(service.getReqURL(recipient, "custom_attributes"))
	fmt.Println(body)
	res, err := client.R().
		SetHeader("Content-Type", "application/json").
		SetHeader("api_access_token", service.botAccessToken).
		SetBody(body).
		Post(service.getReqURL(recipient, "custom_attributes"))

	fmt.Println(res)

	if err != nil {
		return err
	}

	return nil
}

func (service RaabtaRepository) getReqURL(recipient models.RaabtaRecipient, resource string) string {
	return fmt.Sprintf("%s/api/v1/accounts/%s/conversations/%s/%s", service.baseUrl, recipient.AccountID, recipient.ConversationID, resource)
}
