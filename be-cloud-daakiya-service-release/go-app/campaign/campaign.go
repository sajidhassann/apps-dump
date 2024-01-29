package campaign

import (
	"go-app/campaign/model"
	"go-app/campaign/repository"
	"go-app/campaign/repository/db_model"
	"go-app/constant"
	"go-app/producer"
	"sync"
)

type CampaignService struct {
	repository repository.ICampaignRepository
	producer   producer.IProducer
}

type Campaign interface {
	StartCampaignCreation(wg *sync.WaitGroup, campaign model.Campaign)
	pushCampaignNotificationToKafka(cohortUsers *[]db_model.CohortUser, campaign model.Campaign)
	UpdateCampaignStatus(wg *sync.WaitGroup, campaignID string, status model.CampaignStatus)
}

func NewCampaignService(campaignRepository repository.ICampaignRepository, producer producer.IProducer) *CampaignService {
	return &CampaignService{repository: campaignRepository, producer: producer}
}

func (service *CampaignService) StartCampaignCreation(wg *sync.WaitGroup, campaign model.Campaign) {
	defer wg.Done()
	service.UpdateCampaignStatus(campaign.ID, model.CreationInProgress)

	for offset := 0; ; offset = offset + constant.FCM_NOTIFICATION_LIMIT {
		cohortUsers := service.repository.GetUsersFromCohorts(&campaign.CohortIDs, offset, constant.FCM_NOTIFICATION_LIMIT)
		service.pushCampaignNotificationToKafka(cohortUsers, campaign)
		if len(*cohortUsers) < constant.FCM_NOTIFICATION_LIMIT {
			break
		}
	}

	service.UpdateCampaignStatus(campaign.ID, model.CreationComplete)
}

func (service *CampaignService) pushCampaignNotificationToKafka(cohortUsers *[]db_model.CohortUser, campaign model.Campaign) {
	campaignUsers := make([]model.CampaignUser, len(*cohortUsers))
	for i, cohortUser := range *cohortUsers {
		campaignUsers[i] = model.CampaignUser{
			UserID: cohortUser.UserID,
			Token:  cohortUser.Token,
		}
	}
	campaignNotification := model.CampaignNotification{
		CampaignID:       campaign.ID,
		NotificationMeta: &campaign.NotificationMeta,
		CampaignUsers:    &campaignUsers,
	}
	service.producer.CampaignNotification(campaignNotification)
}

func (service *CampaignService) UpdateCampaignStatus(campaignID string, status model.CampaignStatus) {
	service.repository.UpdateCampaignStatus(campaignID, model.ToDbModelCampaignStatus(status))
}
