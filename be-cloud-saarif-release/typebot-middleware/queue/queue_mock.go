package queue

import (
	"github.com/stretchr/testify/mock"
	"typebot-middleware/queue/models"
)

type MockQueueService struct {
	mock.Mock
}

func (queue *MockQueueService) Write(topic string, data []models.QueueMessage) {
	queue.Called()
}

func (queue *MockQueueService) Read(topic string, processMessage ProcessMessage, batchSize int) {
	queue.Called()
}
