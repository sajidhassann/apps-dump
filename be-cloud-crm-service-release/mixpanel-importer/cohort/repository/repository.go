package repository

import _ "github.com/go-sql-driver/mysql"
import (
	"crm-handler/cohort/repository/models"
	"database/sql"
	"fmt"
	"log"
	"os"
)

func AddToCohort(cohort []models.CohortCall) {
	var err error
	var db *sql.DB

	db, err = sql.Open("mysql", os.Getenv("DATABASE_URL"))

	if err != nil {
		fmt.Println("Failed to connect to database")
		log.Fatal(err)
	}
	fmt.Println("Connected to database")

	stmtIns, err := db.Prepare("INSERT INTO cohort_call (id, first_name, last_name, cohort_id, notes, number, is_tuition, board, status, availability) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		panic(err.Error())
	}
	defer stmtIns.Close()

	for _, call := range cohort {
		_, err = stmtIns.Exec(call.Id, call.FName, call.LName, call.CohortID, call.Notes, call.Number, call.IsTuition, call.Board, call.Status, call.Availability)
		if err != nil {
			fmt.Println("Failed to insert item", "err", err, "Call", call)
			continue
		}
		fmt.Println("Uploaded Cohort")
	}
	fmt.Println("Uploaded All Cohorts")

	db.Close()
}

func CreateCohort(cohort models.Cohort) {
	var err error
	var db *sql.DB

	db, err = sql.Open("mysql", os.Getenv("DATABASE_URL"))

	if err != nil {
		fmt.Println("Failed to connect to database")
		log.Fatal(err)
	}
	fmt.Println("Connected to database")

	stmtIns, err := db.Prepare("INSERT IGNORE INTO cohort (id, name, admin_id, type) VALUES(?, ?, ?, ?)")
	defer stmtIns.Close()

	if err != nil {
		panic(err.Error())
	}

	_, err = stmtIns.Exec(cohort.Id, cohort.Name, "", cohort.Type)

	if err != nil {
		fmt.Println("Failed to insert cohort", "err", err, "Cohort", cohort)
	}

	db.Close()
}
