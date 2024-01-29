package campaign

import (
	"go-app/campaign/model"
	"go-app/campaign/repository/db_model"
	mock_repository "go-app/campaign/repository/mocks"
	"go-app/constant"
	mock_producer "go-app/producer/mocks"
	"go.uber.org/mock/gomock"
	"sync"
	"testing"
)

func TestShouldGetCohortUsersInPagination_StartCampaignCreation(t *testing.T) {
	ctrl := gomock.NewController(t)

	repository := mock_repository.NewMockICampaignRepository(ctrl)
	mockProducer := mock_producer.NewMockIProducer(ctrl)
	service := NewCampaignService(repository, mockProducer)

	CohortIDs := []string{"1", "2", "3"}

	cohortUsers := []db_model.CohortUser{{UserID: "1", Token: "1"}, {UserID: "2", Token: "2"}}

	repository.EXPECT().GetUsersFromCohorts(&CohortIDs, 0, constant.FCM_NOTIFICATION_LIMIT).Return(&cohortUsers).Times(1)

	repository.EXPECT().UpdateCampaignStatus("123", db_model.CreationInProgress)
	repository.EXPECT().UpdateCampaignStatus("123", db_model.CreationComplete)
	mockProducer.EXPECT().CampaignNotification(gomock.Any()).AnyTimes()

	wg := &sync.WaitGroup{}
	wg.Add(1)
	service.StartCampaignCreation(wg, model.Campaign{ID: "123", CohortIDs: CohortIDs, Status: model.Initiated})

}

func TestShouldUpdateCampaignStatuses_StartCampaignCreation(t *testing.T) {
	ctrl := gomock.NewController(t)

	repository := mock_repository.NewMockICampaignRepository(ctrl)
	mockProducer := mock_producer.NewMockIProducer(ctrl)

	service := NewCampaignService(repository, mockProducer)

	CohortIDs := []string{"1", "2", "3"}
	repository.EXPECT().GetUsersFromCohorts(&CohortIDs, 0, constant.FCM_NOTIFICATION_LIMIT).Return(&[]db_model.CohortUser{})

	repository.EXPECT().UpdateCampaignStatus("123", db_model.CreationInProgress).Times(1)
	repository.EXPECT().UpdateCampaignStatus("123", db_model.CreationComplete).Times(1)

	mockProducer.EXPECT().CampaignNotification(gomock.Any())

	wg := &sync.WaitGroup{}
	wg.Add(1)
	service.StartCampaignCreation(wg, model.Campaign{ID: "123", CohortIDs: CohortIDs, Status: model.Initiated})
}

func TestShouldUpdateCampaignStatus_UpdateCampaignStatus(t *testing.T) {
	ctrl := gomock.NewController(t)

	repository := mock_repository.NewMockICampaignRepository(ctrl)
	mockProducer := mock_producer.NewMockIProducer(ctrl)

	service := NewCampaignService(repository, mockProducer)

	repository.EXPECT().UpdateCampaignStatus("123", db_model.CreationInProgress).Times(1)

	service.UpdateCampaignStatus("123", model.CreationInProgress)
}
