package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"typebot-middleware/raabta"
	"typebot-middleware/shared/models"
)

type IRaabtaController interface {
	processEvent(context *gin.Context)
}

type RaabtaController struct {
	service raabta.IRaabtaService
}

func NewRaabtaController(engine *gin.RouterGroup, service raabta.IRaabtaService) IRaabtaController {
	controller := RaabtaController{service}
	controller.register(engine)
	return &controller
}

func (controller *RaabtaController) register(engine *gin.RouterGroup) {
	engine.POST("/process", controller.processEvent)
}

func (controller *RaabtaController) processEvent(context *gin.Context) {
	var event *models.Event
	err := context.BindJSON(&event)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format"})
		return
	}
	err = controller.service.ProcessEvent(event)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	context.JSON(http.StatusOK, gin.H{"status": "event processed"})
}
