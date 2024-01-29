package models

import (
	"encoding/json"
	"fmt"
)

type CohortCall struct {
	Id           string       `dynamo:"id"`
	FName        string       `dynamo:"fName"`
	LName        string       `dynamo:"lName"`
	CohortID     string       `dynamo:"cohortID"`
	Notes        string       `dynamo:"notes"`
	PhoneType    string       `dynamo:"phoneType"`
	Number       string       `dynamo:"number"`
	Board        string       `dynamo:"board"`
	Subjects     []string     `dynamo:"subjects"`
	IsTuition    bool         `dynamo:"isTuition"`
	Status       CallStatus   `dynamo:"status"`
	Availability Availability `dynamo:"availability"`
	UpdatedAt    *int64       `dynamo:"updatedAt"`
	CreatedAt    *int64       `dynamo:"createdAt"`
}

func (cohort CohortCall) ToJson() []byte {
	val, err := json.Marshal(cohort)
	if err != nil {
		fmt.Println("Failed to parse object")
		return nil
	}
	return val
}

type Availability string

const (
	RELEASED    Availability = "RELEASED"
	COMIMG_SOON              = "COMIMG_SOON"
	DELETED                  = "DELETED"
)

type CallStatus string

const (
	PENDING     CallStatus = "PENDING"
	COMPLETED              = "COMPLETED"
	CONNECTED              = "CONNECTED"
	IN_PROGRESS            = "IN_PROGRESS"
)
