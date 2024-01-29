package main

import (
	"crm-handler/cohort/controller"
	"crm-handler/cohort/service"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"sync"
)

func startServer() {
	defer wg.Done()
	r := gin.Default()
	controller.Main(r)
	err := r.Run()
	if err != nil {
		fmt.Println("Failed to run server", err)
		return
	}
}

func prepare() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Failed to load config", err)
		return
	}
}


var wg sync.WaitGroup

func runConsumer() {
	defer wg.Done()
	service.RunConsumer()
}

func main() {
	wg.Add(2)
	prepare()
	go startServer()
	go runConsumer()
	wg.Wait()
}
