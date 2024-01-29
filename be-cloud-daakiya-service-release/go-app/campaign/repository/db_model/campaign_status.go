package db_model

type CampaignStatus string

const (
	Initiated          CampaignStatus = "INITIATED"
	CreationInProgress CampaignStatus = "CREATION_IN_PROGRESS"
	CreationComplete   CampaignStatus = "CREATION_COMPLETE"
	SendingInProgress  CampaignStatus = "SENDING_IN_PROGRESS"
	SendingComplete    CampaignStatus = "SENDING_COMPLETE"
)
