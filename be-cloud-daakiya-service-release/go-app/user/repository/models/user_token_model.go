package models

import (
	"database/sql"
)

type UserToken struct {
	Token  string
	UserID string
}

func NewUser(row *sql.Row) *UserToken {
	var token UserToken
	if row.Scan(&token.Token, &token.UserID) == nil {
		return &token
	}
	return nil
}
