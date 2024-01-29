package consumer

import (
	"encoding/json"
	"fmt"
	"github.com/segmentio/kafka-go"
	"go-app/campaign"
	"go-app/campaign/model"
	"go-app/constant"
	"go-app/kafka_queue"
	"go-app/notification"
	"sync"
)

type Consumer struct {
	kafka               kafka_queue.KafkaQueueService
	campaignService     *campaign.CampaignService
	notificationService *notification.NotificationService
}

func NewConsumer(campaignService *campaign.CampaignService, notificationService *notification.NotificationService) *Consumer {
	return &Consumer{campaignService: campaignService, notificationService: notificationService}
}

func (consumer *Consumer) Reader(wg *sync.WaitGroup) {
	defer wg.Done()
	wg.Add(2)
	go consumer.kafka.Read(constant.CAMPAIGN_TOPIC, consumer.processCampaignMessage, 1, wg)
	go consumer.kafka.Read(constant.CAMPAIGN_NOTIFICATION_TOPIC, consumer.processCampaignNotificationMessage, 1, wg)
}

func (consumer *Consumer) processCampaignMessage(wg *sync.WaitGroup, message kafka.Message, cb func()) {
	defer cb()
	campaignData := model.Campaign{}
	errorJson := json.Unmarshal(message.Value, &campaignData)
	if errorJson != nil {
		fmt.Println("Failed to parse message", errorJson)
		return
	}
	fmt.Println("Campaign", campaignData)
	wg.Add(1)
	go consumer.campaignService.StartCampaignCreation(wg, campaignData)
}

func (consumer *Consumer) processCampaignNotificationMessage(wg *sync.WaitGroup, message kafka.Message, cb func()) {
	defer cb()
	campaignNotification := model.CampaignNotification{}
	errorJson := json.Unmarshal(message.Value, &campaignNotification)
	if errorJson != nil {
		fmt.Println("Failed to parse message", errorJson)
		return
	}
	fmt.Println("Campaign Notification", campaignNotification)

	if len(*campaignNotification.CampaignUsers) != 0 {
		wg.Add(1)
		go consumer.notificationService.SendBulkNotification(wg, campaignNotification.ToBulkNotification())
	}

	if len(*campaignNotification.CampaignUsers) < constant.FCM_NOTIFICATION_LIMIT {
		consumer.campaignService.UpdateCampaignStatus(campaignNotification.CampaignID, model.SendingComplete)
	} else {
		consumer.campaignService.UpdateCampaignStatus(campaignNotification.CampaignID, model.SendingInProgress)
	}
}
