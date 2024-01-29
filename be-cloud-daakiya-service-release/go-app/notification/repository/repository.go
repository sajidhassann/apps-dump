package repository

import (
	"fmt"
	"github.com/google/uuid"
	"go-app/core/database"
	"go-app/notification/repository/db_model"
	"strings"
)

type NotificationRepository struct {
	database *database.Database
}

func NewNotificationRepositoryService(database *database.Database) *NotificationRepository {
	return &NotificationRepository{database: database}
}

type INotificationRepository interface {
	CreateBulkNotification(notification []db_model.Notification)
}

// TODO: Refactor
func (service *NotificationRepository) CreateBulkNotification(notifications []db_model.Notification) {
	if len(notifications) == 0 {
		return
	}
	var valueStrings []string
	var valueArgs []interface{}
	i := 1 // Placeholder count

	for _, notification := range notifications {
		valueStrings = append(valueStrings, fmt.Sprintf("($%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d, now())", i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9))
		valueArgs = append(valueArgs, uuid.New())
		valueArgs = append(valueArgs, notification.UserID)
		valueArgs = append(valueArgs, notification.Token)
		valueArgs = append(valueArgs, notification.MetaID)
		valueArgs = append(valueArgs, notification.NotificationStatus)
		valueArgs = append(valueArgs, notification.FcmMessageID)
		valueArgs = append(valueArgs, notification.FcmErrorStatus)
		valueArgs = append(valueArgs, notification.FcmErrorReason)
		valueArgs = append(valueArgs, notification.FcmErrorCode)
		valueArgs = append(valueArgs, notification.FcmErrorDetails)
		i += 10
	}

	stmt := fmt.Sprintf("INSERT INTO notification (id,user_id, token, meta_id, status, fcm_message_id, fcm_error_status, fcm_error_reason, fcm_error_code, fcm_error_details, updated_at) VALUES %s",
		strings.Join(valueStrings, ","))
	_, err := service.database.Client.Exec(stmt, valueArgs...)
	if err != nil {
		fmt.Println(err)
	}

}
