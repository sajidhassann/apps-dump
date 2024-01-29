package consumer

import (
	"context"
	"crm-handler/internal/consumer/models"
	"fmt"
	"github.com/segmentio/kafka-go"
	"log"
	"os"
	"strings"
)

//
//func processMessage(m kafka.Message) {
//	data := models.NewAppSession(m.Value)
//	fmt.Println(data)
//}

func getBrokers() []string {
	brokersString := os.Getenv("BROKER")
	println("Brokers", brokersString)
	return strings.Split(brokersString, ",")
}

func SendMessage(data []models.KafkaMessage, topic string) {
	w := &kafka.Writer{
		Addr:     kafka.TCP(getBrokers()...),
		Topic:    topic,
		Balancer: &kafka.LeastBytes{},
	}

	for index, element := range data {
		fmt.Println("At index", index, "value is", string(element.Value))
		postMessage(element, w)
	}
	if err := w.Close(); err != nil {
		log.Fatal("failed to close writer:", err)
	}
}

func postMessage(data models.KafkaMessage, w *kafka.Writer) {
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

type ProcessMessages func(m []kafka.Message)

func Listen(topic string, processMessages ProcessMessages, batchSize int) {
	println(getBrokers())
	// make a new reader that consumes from topic-A, partition 0, at offset 42
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:   getBrokers(),
		Topic:     topic,
		Partition: 0,
		MinBytes:  10e3, // 10KB
		MaxBytes:  10e6, // 10MB
		GroupID:   "saarif-importer",
	})

	batch := make([]kafka.Message, 0)
	counter := 0

	for {
		m, err := r.ReadMessage(context.Background())
		if err != nil {
			fmt.Printf("Failed to process message at offSet %d", m.Offset)
			break
		}

		batch = append(batch, m)
		counter += 1
		if counter >= batchSize {
			processMessages(batch)
			counter = 0
			r.CommitMessages(context.Background(), batch...)
			batch = make([]kafka.Message, 0)
		}
	}

	if err := r.Close(); err != nil {
		log.Fatal("failed to close reader:", err)
	}
}
