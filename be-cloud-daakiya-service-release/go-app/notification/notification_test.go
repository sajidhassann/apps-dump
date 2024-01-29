package notification

import (
	"firebase.google.com/go/messaging"
	"github.com/google/uuid"
	mock_fcm "go-app/fcm/mocks"
	"go-app/notification/models"
	"go-app/notification/repository/db_model"
	mock_repository "go-app/notification/repository/mocks"
	"go.uber.org/mock/gomock"
	"sync"
	"testing"
)

func TestShouldSendBulkNotificationViaFCM_SendBulkNotification(t *testing.T) {
	ctrl := gomock.NewController(t)

	fcmServiceMock := mock_fcm.NewMockIFCMService(ctrl)
	repository := mock_repository.NewMockINotificationRepository(ctrl)

	mockMessageID := uuid.New().String()
	batchResponse := messaging.BatchResponse{
		Responses: []*messaging.SendResponse{
			{
				Success:   true,
				MessageID: mockMessageID,
			},
		},
	}
	fcmServiceMock.EXPECT().SendNotification(gomock.Any(), gomock.Any()).Return(&batchResponse, nil).Times(1)

	notifications := []db_model.Notification{
		{
			UserID:             "1",
			Token:              "1",
			MetaID:             "1",
			NotificationStatus: db_model.Sent,
			FcmMessageID:       mockMessageID,
		},
	}
	repository.EXPECT().CreateBulkNotification(notifications)

	notificationService := NewNotificationService(repository, fcmServiceMock)

	wg := &sync.WaitGroup{}
	bulkNotification := models.BulkNotification{
		Users: []models.NotificationUser{
			{
				UserID: "1",
				Token:  "1",
			},
		},
		NotificationMeta: models.NotificationMeta{
			ID:    "1",
			Title: "title",
			Body:  "body",
		},
	}
	wg.Add(1)
	notificationService.SendBulkNotification(wg, bulkNotification)

}

func TestShouldStoreNotificationForTheGivenBatch_SendBulkNotification(t *testing.T) {
	ctrl := gomock.NewController(t)

	fcmServiceMock := mock_fcm.NewMockIFCMService(ctrl)
	repository := mock_repository.NewMockINotificationRepository(ctrl)

	mockMessageID := uuid.New().String()
	batchResponse := messaging.BatchResponse{
		Responses: []*messaging.SendResponse{
			{
				Success:   true,
				MessageID: mockMessageID,
			},
		},
	}
	fcmServiceMock.EXPECT().SendNotification(gomock.Any(), gomock.Any()).Return(&batchResponse, nil)

	notifications := []db_model.Notification{
		{
			UserID:             "1",
			Token:              "1",
			MetaID:             "1",
			NotificationStatus: db_model.Sent,
			FcmMessageID:       mockMessageID,
		},
	}
	repository.EXPECT().CreateBulkNotification(notifications).Times(1)

	notificationService := NewNotificationService(repository, fcmServiceMock)

	wg := &sync.WaitGroup{}
	bulkNotification := models.BulkNotification{
		Users: []models.NotificationUser{
			{
				UserID: "1",
				Token:  "1",
			},
		},
		NotificationMeta: models.NotificationMeta{
			ID:    "1",
			Title: "title",
			Body:  "body",
		},
	}
	wg.Add(1)
	notificationService.SendBulkNotification(wg, bulkNotification)

}
