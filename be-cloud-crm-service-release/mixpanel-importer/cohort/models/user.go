package models

import (
	"crm-handler/cohort/repository/models"
	"encoding/json"
	"fmt"
	"strings"
	"time"
)

type User struct {
	Email            *string `json:"$email"`
	Phone            *string `json:"$phone"`
	LName            *string `json:"first_name"`
	FName            *string `json:"last_name"`
	DistinctID       *string `json:"$distinct_id"`
	Name             *string `json:"$name"`
	UserID           *string `json:"User ID"`
	Board            *string `json:"board"`
	AppSessionsCount *int    `json:"ae_total_app_sessions"`
	City             *string `json:"$city"`
	VLPaid           *string `json:"vl_paid"`
	TestPaid         *string `json:"test_paid"`
	Region           *string `json:"$region"`
	Grade            *string `json:"grade"`
}

func (user *User) ToCohortCall(cohortID string) models.CohortCall {

	fName := ""
	lName := ""
	userID := ""
	phoneNumber := ""
	board := ""
	if user.FName != nil {
		fName = *user.FName
	}
	if user.LName != nil {
		lName = *user.LName
	}

	if user.Name != nil {
		name := strings.Split(*user.Name, " ")
		fName = name[0]
		if len(name) > 1 {
			lName = name[1]
		}
	}

	if user.Phone != nil {
		phoneNumber = *user.Phone
	}
	if user.DistinctID != nil {
		userID = *user.DistinctID
	}

	if user.Board != nil {
		board = *user.Board
	}

	currentTime := time.Now().Unix()

	return models.CohortCall{
		Id:           userID,
		FName:        fName,
		LName:        lName,
		CohortID:     cohortID,
		Notes:        "",
		PhoneType:    "Shared",
		Number:       phoneNumber,
		Board:        board,
		Subjects:     nil,
		IsTuition:    false,
		Status:       models.PENDING,
		Availability: models.RELEASED,
		UpdatedAt:    &currentTime,
		CreatedAt:    &currentTime,
	}
}

func (user *User) ToJson() []byte {
	val, err := json.Marshal(user)
	if err != nil {
		fmt.Println("Failed to parse object")
		return nil
	}
	return val
}
