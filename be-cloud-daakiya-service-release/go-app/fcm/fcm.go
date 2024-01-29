package fcm

import (
	"context"
	"fmt"
	"os"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/messaging"
	"google.golang.org/api/option"
)

type IFCMService interface {
	SendNotification(tokens []string, data map[string]string) (*messaging.BatchResponse, error)
}

type FCMService struct {
	app    *firebase.App
	client *messaging.Client
}

func NewFCMService() (*FCMService, error) {
	serviceAccountKeyJSON := os.Getenv("FCM_KEY")
	if serviceAccountKeyJSON == "" {
		return nil, fmt.Errorf("FCM_KEY environment variable is not set")
	}

	opt := option.WithCredentialsJSON([]byte(serviceAccountKeyJSON))

	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		return nil, fmt.Errorf("error initializing Firebase app: %v", err)
	}

	client, err := app.Messaging(context.Background())
	if err != nil {
		return nil, fmt.Errorf("error initializing FCM client: %v", err)
	}

	return &FCMService{app: app, client: client}, nil
}

func (s *FCMService) SendNotification(tokens []string, data map[string]string) (*messaging.BatchResponse, error) {

	res, err := s.client.SendMulticast(context.Background(), &messaging.MulticastMessage{
		Tokens: tokens,
		Data:   data,
	})
	if err != nil {
		return nil, fmt.Errorf("error sending FCM message: %v", err)
	}

	return res, nil
}
