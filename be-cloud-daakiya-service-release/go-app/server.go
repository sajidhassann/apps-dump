package main

import (
	"fmt"
	"github.com/joho/godotenv"
	"go-app/campaign"
	"go-app/campaign/repository"
	"go-app/consumer"
	"go-app/core/database"
	"go-app/fcm"
	"go-app/kafka_queue"
	"go-app/notification"
	repository2 "go-app/notification/repository"
	"go-app/producer"
	"os"
	"strconv"
	"sync"
)

var wg sync.WaitGroup

type Server struct {
	consumer *consumer.Consumer
}

func prepareENV() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Failed to load config", err)
		return
	}
}

func (server *Server) start() {
	wg.Add(1)
	fmt.Println("Server is started")
	go server.consumer.Reader(&wg)
}

func NewServer() *Server {
	port, err := strconv.Atoi(os.Getenv("DATABASE_PORT"))
	client := database.SetupClient(database.Config{
		User:         os.Getenv("DATABASE_USER"),
		Password:     os.Getenv("DATABASE_PASSWORD"),
		Host:         os.Getenv("DATABASE_HOST"),
		DatabaseName: os.Getenv("DATABASE_NAME"),
		Port:         port,
	})
	newProducer := producer.NewProducer(kafka_queue.NewKafkaQueueService())
	campaignRepository := repository.NewCampaignRepository(&client)
	campaignService := campaign.NewCampaignService(campaignRepository, newProducer)
	notificationRepository := repository2.NewNotificationRepositoryService(&client)
	fcmService, err := fcm.NewFCMService()
	if err != nil {
		fmt.Errorf("Failed to create FCM service")
		panic(err)
	}
	notificationService := notification.NewNotificationService(notificationRepository, fcmService)
	newConsumer := consumer.NewConsumer(campaignService, notificationService)

	return &Server{consumer: newConsumer}
}

func main() {
	wg.Add(1)
	prepareENV()
	server := NewServer()
	server.start()
	wg.Wait()
}
