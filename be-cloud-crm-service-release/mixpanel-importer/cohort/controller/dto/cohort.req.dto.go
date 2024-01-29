package dto

import "crm-handler/cohort/models"

type CohortParameters struct {
	ProjectID         string        `json:"mixpanel_project_id"`
	IntegrationID     string        `json:"mixpanel_integration_id"`
	CohortName        string        `json:"mixpanel_cohort_name"`
	CohortID          string        `json:"mixpanel_cohort_id"`
	MixpanelSessionID string        `json:"mixpanel_session_id"`
	Members           []models.User `json:"members"`
}

type CohortRequestDto struct {
	Action     string           `json:"action"`
	Parameters CohortParameters `json:"parameters"`
}
