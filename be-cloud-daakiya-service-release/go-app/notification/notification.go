package notification

import (
	"fmt"
	"go-app/fcm"
	"go-app/notification/models"
	"go-app/notification/repository"
	"go-app/notification/repository/db_model"
	"strings"
	"sync"
)

type NotificationService struct {
	repository repository.INotificationRepository
	fcmService fcm.IFCMService
}

type INotificationService interface {
	SendBulkNotification(wg *sync.WaitGroup, bulkNotification models.BulkNotification)
}

func NewNotificationService(notificationRepository repository.INotificationRepository, fcmService fcm.IFCMService) *NotificationService {
	return &NotificationService{repository: notificationRepository, fcmService: fcmService}
}

func (service *NotificationService) SendBulkNotification(wg *sync.WaitGroup, bulkNotification models.BulkNotification) {
	defer wg.Done()
	bulkNotificationsDbModel := service.sendNotificationsViaFCM(&bulkNotification)
	if bulkNotificationsDbModel != nil {
		service.repository.CreateBulkNotification(*bulkNotificationsDbModel)
	}

}

func (service *NotificationService) sendNotificationsViaFCM(bulkNotification *models.BulkNotification) *[]db_model.Notification {
	tokens := make([]string, len(bulkNotification.Users))
	for i, user := range bulkNotification.Users {
		tokens[i] = user.Token
	}
	//TODO: Map on model
	payload := make(map[string]string)
	if bulkNotification.NotificationMeta.Link != nil {
		payload["click_action"] = *bulkNotification.NotificationMeta.Link
	}
	payload["title"] = bulkNotification.NotificationMeta.Title
	payload["body"] = bulkNotification.NotificationMeta.Body

	payload["id"] = bulkNotification.NotificationMeta.ID
	result, err := service.fcmService.SendNotification(
		tokens,
		payload,
	)

	if err != nil {
		fmt.Printf("error while sending result %s\n", err.Error())
	}
	if result != nil {
		var notifications []db_model.Notification

		for i, user := range bulkNotification.Users {
			//fmt.Printf("result.response %s %s\n", result.Responses[i].Error, result.Responses[i].Error.Error())
			var notification db_model.Notification
			fcmResponse := result.Responses[i]
			fcmMessageID := strings.Split(fcmResponse.MessageID, "/")
			messageID := fcmMessageID[len(fcmMessageID)-1]
			if result.Responses[i].Success {
				notification = db_model.Notification{
					UserID:             user.UserID,
					Token:              user.Token,
					MetaID:             bulkNotification.NotificationMeta.ID,
					NotificationStatus: db_model.Sent,
					FcmMessageID:       messageID,
				}
			} else {
				fcmError := strings.Split(fcmResponse.Error.Error(), ";")
				for i, str := range fcmError {
					fcmError[i] = strings.TrimSpace(strings.Split(str, ":")[1])
				}
				notification = db_model.Notification{
					UserID:             user.UserID,
					Token:              user.Token,
					MetaID:             bulkNotification.NotificationMeta.ID,
					NotificationStatus: db_model.Failed,
					FcmMessageID:       fcmResponse.MessageID,
					FcmErrorStatus:     fcmError[0],
					FcmErrorReason:     fcmError[1],
					FcmErrorCode:       fcmError[2],
					FcmErrorDetails:    fcmError[3],
				}
			}
			notifications = append(notifications, notification)
		}
		return &notifications
	}

	return nil
}

