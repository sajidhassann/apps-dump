package models

import (
	"encoding/json"
	"fmt"
)

type CohortUser struct {
	User     *User  `json:"user"`
	CohortID string `json:"cohortID"`
}

func (user *CohortUser) ToJson() []byte {
	val, err := json.Marshal(user)
	if err != nil {
		fmt.Println("Failed to parse object")
		return nil
	}
	return val
}
