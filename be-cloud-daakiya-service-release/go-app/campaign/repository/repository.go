package repository

import (
	"fmt"
	"go-app/campaign/repository/db_model"
	"go-app/core/database"
	"log"
	"strings"
)

type CampaignRepository struct {
	database *database.Database
}

func NewCampaignRepository(database *database.Database) *CampaignRepository {

	return &CampaignRepository{database: database}
}

type ICampaignRepository interface {
	GetTokensForUser(campaignID string) []string
	CreateCampaign(name string, source string) db_model.CampaignModelDB
	AddUsersToCampaign(campaignID string)
	UpdateCampaignStatus(campaignID string, status db_model.CampaignStatus)
	GetUsersFromCohorts(cohortIDs *[]string, offset int, limit int) *[]db_model.CohortUser
}

func (service *CampaignRepository) GetTokensForUser(campaignID string) []string {

	var tokens []string

	//service.database = database.SetupClient(database.Config{
	//	User:         "daakiya",
	//	Password:     "hRJ-uJQlh,^vra71Uw8fu4.-5WLhhd",
	//	Host:         "localhost",
	//	DatabaseName: "daakiya",
	//	Port:         5431,
	//})

	rows, _ := service.database.Client.Query(" select token from daakiya_campaign_user dcu inner join token on dcu.user_id = token.user_id where dcu.campaign_id = $1", campaignID)

	// Loop through rows, using Scan to assign column data to struct fields.
	for rows.Next() {
		var token string
		if err := rows.Scan(&token); err != nil {
			fmt.Errorf("Oopps I did it again %v", err)
		}
		tokens = append(tokens, token)
	}
	return tokens
}

func (service *CampaignRepository) CreateCampaign(name string, source string) db_model.CampaignModelDB {
	campaign := db_model.NewCampaign(name, source)
	service.database.Client.Exec("INSERT INTO daakiya_campaign (id, name, source) VALUES ($1, $2, $3)", campaign.ID, campaign.Name, campaign.Source)
	return *campaign
}

func (service *CampaignRepository) AddUsersToCampaign(campaignID string) {
	service.database.Client.Exec("insert into daakiya_campaign_user (user_id,campaign_id)  (select public.user.id, $1 from public.user)", campaignID)
}

func (service *CampaignRepository) UpdateCampaignStatus(campaignID string, status db_model.CampaignStatus) {
	service.database.Client.Exec("update campaign set status = $1 where id = $2", status, campaignID)
}

func (service *CampaignRepository) GetUsersFromCohorts(cohortIDs *[]string, offset int, limit int) *[]db_model.CohortUser {

	placeholders := make([]string, len(*cohortIDs))
	for i := range *cohortIDs {
		placeholders[i] = fmt.Sprintf("$%d", i+1)
	}

	query := fmt.Sprintf("SELECT DISTINCT t.user_id, t.token FROM cohort_user cu INNER JOIN token t ON cu.user_id = t.user_id WHERE cu.cohort_id IN (%s) LIMIT $%d OFFSET $%d", strings.Join(placeholders, ","), len(*cohortIDs)+1, len(*cohortIDs)+2)

	params := make([]interface{}, len(*cohortIDs)+2)
	for i, id := range *cohortIDs {
		params[i] = id
	}
	params[len(*cohortIDs)] = limit
	params[len(*cohortIDs)+1] = offset

	rows, err := service.database.Client.Query(query, params...)
	if err != nil {
		log.Println("Error querying database:", err)
		return nil
	}
	defer rows.Close()

	var users []db_model.CohortUser
	for rows.Next() {
		var user db_model.CohortUser
		if err := rows.Scan(&user.UserID, &user.Token); err != nil {
			log.Println("Error scanning row:", err)
			return nil
		}
		users = append(users, user)
	}

	// Check for errors from iterating over rows.
	if err := rows.Err(); err != nil {
		log.Println("Error iterating over rows:", err)
		return nil
	}

	return &users
}
