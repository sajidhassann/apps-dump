package models

type Cohort struct {
	Id   string `dynamo:"id"`
	Name string `dynamo:"name"`
	Type string `dynamo:"type"`
}
