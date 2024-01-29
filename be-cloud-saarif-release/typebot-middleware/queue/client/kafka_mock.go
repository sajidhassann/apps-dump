package client

import (
	"github.com/stretchr/testify/mock"
	"typebot-middleware/queue/models"
)

type KafkaQueueServiceMock struct {
	mock.Mock
}

func (queue *KafkaQueueServiceMock) Write(topic string, data []models.QueueMessage) {
	queue.Called()
}

func (queue *KafkaQueueServiceMock) Read(topic string, processMessage ProcessMessage, batchSize int) {
	queue.Called()
}
