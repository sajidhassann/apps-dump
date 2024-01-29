package user

import (
	"github.com/stretchr/testify/assert"
	mock_repository "go-app/user/mocks"
	"go.uber.org/mock/gomock"
	"testing"
)

func TestShouldReturnTokenForUserIfUserExists(t *testing.T) {

	ctrl := gomock.NewController(t)

	// 👇 create new mock client
	mockRepository := mock_repository.NewMockUserRepository(ctrl)

	val := "token777"
	mockRepository.EXPECT().GetToken("123").Return(&val)

	//service := NewUserService(mockRepository)
	service := Service{mockRepository}

	token := *service.GetUserToken("123")

	assert.Equal(t, token, "token777")

}

func TestShouldNotReturnTokenIfUserDoesNotExist(t *testing.T) {

	ctrl := gomock.NewController(t)

	// 👇 create new mock client
	mockRepository := mock_repository.NewMockUserRepository(ctrl)

	mockRepository.EXPECT().GetToken("azeembhai").Return(nil)

	service := Service{mockRepository}
	val := service.GetUserToken("azeembhai")

	assert.Nil(t, val)

}
