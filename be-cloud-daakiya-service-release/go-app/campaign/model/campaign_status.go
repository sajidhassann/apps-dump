package model

import "go-app/campaign/repository/db_model"

type CampaignStatus string

const (
	Initiated          CampaignStatus = "INITIATED"
	CreationInProgress CampaignStatus = "CREATION_IN_PROGRESS"
	CreationComplete   CampaignStatus = "CREATION_COMPLETE"
	SendingInProgress  CampaignStatus = "SENDING_IN_PROGRESS"
	SendingComplete    CampaignStatus = "SENDING_COMPLETE"
)

func ToDbModelCampaignStatus(status CampaignStatus) db_model.CampaignStatus {
	switch status {
	case Initiated:
		return db_model.Initiated
	case CreationInProgress:
		return db_model.CreationInProgress
	case CreationComplete:
		return db_model.CreationComplete
	case SendingInProgress:
		return db_model.SendingInProgress
	case SendingComplete:
		return db_model.SendingComplete
	default:
		return db_model.Initiated

	}
}
