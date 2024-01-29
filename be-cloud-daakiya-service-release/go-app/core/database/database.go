package database

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"log"
)

type Database struct {
	Client *sql.DB
}

type Config struct {
	User         string
	Password     string
	Host         string
	DatabaseName string
	Port         int
}

func SetupClient(config Config) Database {
	// Capture connection properties.
	//cfg := mysql.Config{
	//	CampaignUsers:   config.CampaignUsers,
	//	Passwd: config.Password,
	//	Net:    "tcp",
	//	Addr:   config.Host,
	//	DBName: config.DatabaseName,
	//}

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s",
		config.Host, config.Port, config.User, config.Password, config.DatabaseName)

	fmt.Println("Connecting to Database")
	// Get a database handle.
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}

	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("Connected!")
	return Database{db}
}
