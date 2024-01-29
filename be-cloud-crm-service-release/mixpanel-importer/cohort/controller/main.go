package controller

import (
	"crm-handler/cohort/controller/dto"
	"crm-handler/cohort/service"
	"fmt"
	"github.com/gin-gonic/gin"
)

func Main(r *gin.Engine) {
	r.POST("/cohort", postCohort)
}

func postCohort(c *gin.Context) {
	var req *dto.CohortRequestDto
	if err := c.BindJSON(&req); err != nil {
		fmt.Println("Failed ot bind json", err)
		return
	}
	fmt.Println("SSs")
	go service.CreateCohort(req)
	go service.PostCohortToKafka(req)
	c.JSON(200, dto.CohortResDto{Action: req.Action, Status: "success"})
}

// func performTest() {
// 	// Mock data
// 	cohort := make([]models.CohortCall, 3)

// 	for i := range cohort {
// 		updatedAt := time.Now().UnixNano() / int64(time.Millisecond)
// 		createdAt := time.Now().UnixNano() / int64(time.Millisecond)

// 		cohort[i] = models.CohortCall{
// 			Id:           fmt.Sprintf("%d", i+1),
// 			FName:        fmt.Sprintf("Name%d", i+1),
// 			LName:        fmt.Sprintf("Surname%d", i+1),
// 			CohortID:     "1670eb9f-ce58-4ce5-9a52-424f66f966bd",
// 			Notes:        fmt.Sprintf("notes%d", i+1),
// 			Number:       fmt.Sprintf("number%d", i+1),
// 			Board:        fmt.Sprintf("board%d", i+1),
// 			IsTuition:    i%2 == 0,  // Alternate between true and false
// 			Status:       "PENDING",
// 			Availability: "RELEASED",
// 			UpdatedAt:    &updatedAt,
// 			CreatedAt:    &createdAt,
// 		}
// 	}

// 	// Invoke the function
// 	repository.AddToCohort(cohort)
// }
