package client

import (
	"context"
	"fmt"
	"github.com/segmentio/kafka-go"
	"log"
	"typebot-middleware/queue/client/models"
)

var ctx = context.Background()

type KakaClientConfig struct {
	brokers []string
	groupID string
}

func NewKafkaClient(brokers []string, groupID string) KafkaClient {
	return KafkaClient{KakaClientConfig{
		brokers: brokers,
		groupID: groupID,
	}}
}

type IKafkaClient interface {
	Write(topic string, data []models.KafkaMessage)
	Read(topic string, processMessage ProcessMessage, batchSize int)
}

type KafkaClient struct {
	KakaClientConfig
}

func (client *KafkaClient) Write(topic string, data []models.KafkaMessage) {
	w := &kafka.Writer{
		Addr:     kafka.TCP(client.brokers...),
		Topic:    topic,
		Balancer: &kafka.LeastBytes{},
	}

	for index, element := range data {
		fmt.Println("Writing at index", index)
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

type ProcessMessage func(message kafka.Message, cb func())

func (client *KafkaClient) Read(topic string, processMessage ProcessMessage, batchSize int) {
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers: client.brokers,
		GroupID: client.groupID,
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
		go processMessage(m, func() {
			err = r.CommitMessages(ctx, m)
		})
		fmt.Printf("message at topic/partition/offset %v/%v/%v\n", m.Topic, m.Partition, m.Offset)
	}

	if err := r.Close(); err != nil {
		log.Fatal("failed to close consumer:", err)
	}
}
