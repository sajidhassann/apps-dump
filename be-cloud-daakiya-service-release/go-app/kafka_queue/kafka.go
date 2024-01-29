package kafka_queue

import (
	"context"
	"fmt"
	"github.com/segmentio/kafka-go"
	"go-app/kafka_queue/models"
	"log"
	"os"
	"strings"
	"sync"
)

var ctx = context.Background()

type KafkaQueueService struct {
}

func NewKafkaQueueService() *KafkaQueueService {
	return &KafkaQueueService{}
}

type IKafkaQueueService interface {
	Write(topic string, data []models.KafkaMessage)
	Read(topic string, processMessage ProcessMessage, batchSize int, wg *sync.WaitGroup)
}

func getBrokers() []string {
	brokersString := os.Getenv("BROKER")
	println("Brokers", brokersString)
	return strings.Split(brokersString, ",")
}

type ProcessMessage func(wg *sync.WaitGroup, message kafka.Message, cb func())

func (queue *KafkaQueueService) Write(topic string, data []models.KafkaMessage) {
	w := &kafka.Writer{
		Addr:     kafka.TCP(getBrokers()...),
		Topic:    topic,
		Balancer: &kafka.LeastBytes{},
	}

	for index, element := range data {
		fmt.Println("Writing at index", index, "value is", string(element.Value))
		writeMessage(element, w)
	}
	if err := w.Close(); err != nil {
		log.Fatal("failed to close producer:", err)
	}
}

func writeMessage(data models.KafkaMessage, w *kafka.Writer) {
	err := w.WriteMessages(context.Background(),
		kafka.Message{
			Key:   []byte(data.ID),
			Value: data.Value,
		},
	)
	if err != nil {
		log.Fatal("failed to write messages:", err)
	}

}

func (queue *KafkaQueueService) Read(topic string, processMessage ProcessMessage, batchSize int, wg *sync.WaitGroup) {
	defer wg.Done()
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers: getBrokers(),
		GroupID: "daakiya-service",
		Topic:   topic,
		//Partition: 0,
		MinBytes: 10e3, // 10KB
		MaxBytes: 10e6, // 10MB
	})
	for {
		m, err := r.ReadMessage(ctx)
		if err != nil {
			fmt.Println(err)
			break
		}
		wg.Add(1)
		go processMessage(wg, m, func() {
			defer wg.Done()
			err = r.CommitMessages(ctx, m)
		})
		//fmt.Printf("message at topic/partition/offset %v/%v/%v: %s = %s\n", m.Topic, m.Partition, m.Offset, string(m.Key), string(m.Value))
	}

	if err := r.Close(); err != nil {
		log.Fatal("failed to close consumer:", err)
	}
}
