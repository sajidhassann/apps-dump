package db_model

import "github.com/google/uuid"

type CampaignModelDB struct {
	Name   string
	ID     string
	Source string
}

func NewCampaign(name string, source string) *CampaignModelDB {
	return &CampaignModelDB{Name: name, ID: uuid.New().String(), Source: source}
}
