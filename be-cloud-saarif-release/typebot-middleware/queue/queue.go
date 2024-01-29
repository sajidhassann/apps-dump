package queue

import (
	"context"
	"github.com/segmentio/kafka-go"
	"typebot-middleware/queue/client"
	"typebot-middleware/queue/client/models"
	queue_models "typebot-middleware/queue/models"
	"typebot-middleware/shared/extensions"
)

var ctx = context.Background()

type QueueService struct {
	client client.IKafkaClient
}

func NewQueueService(client client.KafkaClient) *QueueService {
	return &QueueService{&client}
}

type IQueueService interface {
	Write(topic string, data []queue_models.QueueMessage)
	Read(topic string, processMessage ProcessMessage, batchSize int)
}

func (queue *QueueService) Write(topic string, data []queue_models.QueueMessage) {
	queue.client.Write(topic, extensions.Map(data, func(t queue_models.QueueMessage) models.KafkaMessage {
		return models.KafkaMessage{
			ID:    t.ID,
			Value: t.Value,
		}
	}))
}

type ProcessMessage func(message queue_models.QueueMessage, cb func())

func (queue *QueueService) Read(topic string, processMessage ProcessMessage, batchSize int) {
	queue.client.Read(topic, func(message kafka.Message, cb func()) {
		processMessage(queue_models.QueueMessage{
			ID:    string(message.Key),
			Value: message.Value,
		}, cb)
	}, batchSize)
}
