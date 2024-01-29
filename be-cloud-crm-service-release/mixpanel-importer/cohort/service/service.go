package service

import (
	"crm-handler/cohort/controller/dto"
	models3 "crm-handler/cohort/models"
	"crm-handler/cohort/repository"
	models2 "crm-handler/cohort/repository/models"
	"crm-handler/internal/consumer"
	"crm-handler/internal/consumer/models"
	"crm-handler/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/segmentio/kafka-go"
	"runtime"
	"sync"
)

var wg sync.WaitGroup

var topic = "SAARIF_COHORT_TOPIC"

func PostCohortToKafka(cohort *dto.CohortRequestDto) {
	members := cohort.Parameters.Members
	var memberObjs []models.KafkaMessage
	for _, user := range members {

		cohortUser := models3.CohortUser{User: &user, CohortID: cohort.Parameters.CohortName}
		cohortUserJson := cohortUser.ToJson()
		memberObjs = append(memberObjs, models.KafkaMessage{Value: cohortUserJson, ID: *user.DistinctID})
	}

	batches := utils.CreateBatch(memberObjs, runtime.NumCPU()-1)

	for _, batch := range batches {
		wg.Add(1)
		go processBatch(batch)
	}
	wg.Wait()

}

func CreateCohort(cohort *dto.CohortRequestDto) {
	cohortUpload := models2.Cohort{Id: cohort.Parameters.CohortName, Name: cohort.Parameters.CohortName, Type: cohort.Parameters.CohortName}
	repository.CreateCohort(cohortUpload)
}

func processBatch(batch []models.KafkaMessage) {
	defer wg.Done()
	consumer.SendMessage(batch, topic)
}

func insertIntoCohort(messages []kafka.Message) {
	cohort := make([]models2.CohortCall, 0)
	for _, message := range messages {
		fmt.Println(" Message", string(message.Value))
		cohortUser := models3.CohortUser{}
		errorJson := json.Unmarshal(message.Value, &cohortUser)
		if errorJson != nil {
			fmt.Printf("Failed to parse message", errorJson)
			return
		}
		cohort = append(cohort, cohortUser.User.ToCohortCall(cohortUser.CohortID))
	}
	repository.AddToCohort(cohort)
}

func RunConsumer() {

	consumer.Listen(topic, insertIntoCohort, 25)

}
