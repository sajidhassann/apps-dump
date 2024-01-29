package producer

import (
	"encoding/json"
	"fmt"
	"go-app/campaign/model"
	"go-app/constant"
	"go-app/kafka_queue"
	"go-app/kafka_queue/models"
)

type Producer struct {
	Kafka kafka_queue.IKafkaQueueService
}

type IProducer interface {
	CampaignNotification(campaign model.CampaignNotification)
}

func NewProducer(kafka kafka_queue.IKafkaQueueService) *Producer {
	return &Producer{kafka}
}

func (producer *Producer) CampaignNotification(campaign model.CampaignNotification) {
	var data []models.KafkaMessage
	campaignBytes, err := json.Marshal(campaign)
	if err != nil {
		fmt.Println("Failed to marshal campaign", err)
		return
	}
	data = append(data, models.KafkaMessage{
		ID:    campaign.CampaignID,
		Value: campaignBytes,
	})
	producer.Kafka.Write(constant.CAMPAIGN_NOTIFICATION_TOPIC, data)
}
