package model

import "go-app/notification/models"

type CampaignNotification struct {
	CampaignID       string                    `json:"campaign_id"`
	NotificationMeta *CampaignNotificationMeta `json:"notification_meta"`
	CampaignUsers    *[]CampaignUser           `json:"users"`
}

func (notification *CampaignNotification) ToBulkNotification() models.BulkNotification {
	var users []models.NotificationUser
	for _, user := range *notification.CampaignUsers {
		users = append(users, models.NotificationUser{
			UserID: user.UserID,
			Token:  user.Token,
		})
	}
	return models.BulkNotification{
		NotificationMeta: models.NotificationMeta{
			ID:    notification.NotificationMeta.ID,
			Title: notification.NotificationMeta.Title,
			Body:  notification.NotificationMeta.Body,
			Link:  notification.NotificationMeta.Link,
		},
		Users: users,
	}
}
