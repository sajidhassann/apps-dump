package user

import "go-app/user/repository"

type Service struct {
	repository repository.UserRepository
}

func NewUserService(userRepository repository.UserRepository) Service {
	return Service{userRepository}
}

func (service *Service) GetUserToken(userID string) *string {
	return service.repository.GetToken(userID)
}
