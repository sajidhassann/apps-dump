package repository

import (
	"go-app/core/database"
	"go-app/user/repository/models"
)

type UserRepository interface {
	GetToken(userID string) *string
}

type UserRepositoryService struct {
	Database database.Database
}

func (repository *UserRepositoryService) GetToken(userID string) *string {
	row := repository.Database.Client.QueryRow("select token, user_id from token where user_id = $1", userID)
	return &models.NewUser(row).Token
}
