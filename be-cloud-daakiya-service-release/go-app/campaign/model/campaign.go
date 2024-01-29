package model

import (
	"time"
)

type Campaign struct {
	ID               string                   `json:"id"`
	Name             string                   `json:"name"`
	CreatedAt        time.Time                `json:"createdAt"`
	UpdatedAt        time.Time                `json:"updatedAt"`
	Status           CampaignStatus           `json:"status"`
	CohortIDs        []string                 `json:"campaignCohortIDs"`
	NotificationMeta CampaignNotificationMeta `json:"notificationMeta"`
}

//func main() {
//	// Example JSON string
//	jsonStr := `{
//		"name": "Example Campaign",
//		"campaignCohortIDs": ["cohort1", "cohort2"],
//		"notificationMeta": {
//			"title": "Example Title",
//			"body": "Example Body"
//		}
//	}`
//
//	// Unmarshal the JSON string into a Campaign object
//	var campaign Campaign
//	err := json.Unmarshal([]byte(jsonStr), &campaign)
//	if err != nil {
//		fmt.Println("Error unmarshalling JSON:", err)
//		return
//	}
//
//	// Output the unmarshalled object to the console
//	fmt.Printf("Campaign: %+v\n", campaign)
//}
