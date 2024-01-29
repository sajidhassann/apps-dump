package dto

type CohortResDto struct {
	Action string `json:"action"`
	Status string `json:"status"`
	Error  struct {
		Message string `json:"message"`
		Code    int    `json:"code"`
	} `json:"error"`
}
