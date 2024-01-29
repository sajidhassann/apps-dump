package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"os"
	"strings"
	"sync"
	"typebot-middleware/middleware"
	"typebot-middleware/middleware/message_parser"
	"typebot-middleware/queue"
	"typebot-middleware/queue/client"
	"typebot-middleware/raabta"
	"typebot-middleware/raabta/controller"
	"typebot-middleware/raabta/event_validator"
	raabtaReposotory "typebot-middleware/raabta/repository"
	"typebot-middleware/type_bot"
)

var wg sync.WaitGroup

func registerHealthCheck(engine *gin.RouterGroup) {

	engine.GET("/", func(context *gin.Context) {
		context.JSON(200, gin.H{
			"status": "ok",
		})
	})
}

func getQueueService() queue.IQueueService {
	brokersString := os.Getenv("BROKERS")
	brokers := strings.Split(brokersString, ",")
	return queue.NewQueueService(client.NewKafkaClient(brokers, "TYPEBOT_MIDDLEWARE"))
}

func initializeServices(engine *gin.RouterGroup) {
	//Initiate the queueService service and raabta service
	queueService := getQueueService()
	eventValidationService := event_validator.NewEventValidator(os.Getenv("AGENT_ACCOUNT_ID"))
	raabtaService := raabta.NewRaabtaService(queueService, eventValidationService, raabtaReposotory.NewRaabtaRepository())
	controller.NewRaabtaController(engine, raabtaService)

	//Initialize type_bot service
	typeBotService := type_bot.NewTypeBotService()

	//Initiate the middleware
	messageParser := message_parser.NewMessageParserService()
	middlewareService := middleware.NewMiddlewareService(queueService, typeBotService, raabtaService, messageParser)
	middlewareService.ListenForEvents()

}

func prepareEnvironment() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Failed to load config", err)
		return
	}

}

func start() {
	prepareEnvironment()
	defer wg.Done()
	//Initiate the engine and register health check
	engine := gin.Default()
	basePath := engine.Group("/middleware")
	registerHealthCheck(basePath)
	initializeServices(basePath)
	err := engine.Run()
	if err != nil {
		fmt.Println("Failed to run server", err)
		return
	}
	fmt.Println("Server is started")
}

func main() {
	wg.Add(1)
	go start()
	wg.Wait()
}
