package models

type TypeBotError struct {
	Message string  `json:"message"`
	Code    string  `json:"code"`
	Issues  []Issue `json:"issues"`
}

type Issue struct {
	Message string `json:"message"`
}
