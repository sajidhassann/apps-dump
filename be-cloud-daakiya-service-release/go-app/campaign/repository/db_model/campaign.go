package db_model

import "time"

type Campaign struct {
	ID                 string
	Name               string
	CreatedAt          *time.Time
	UpdatedAt          *time.Time
	Status             *CampaignStatus
	CampaignCohortIDs  []string
	NotificationMetaID string
}
