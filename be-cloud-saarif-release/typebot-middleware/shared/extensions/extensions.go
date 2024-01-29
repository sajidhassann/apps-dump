package extensions

import (
	"bytes"
	"github.com/gin-gonic/gin"
	"io"
)

func Map[T, U any](ts []T, f func(T) U) []U {
	us := make([]U, len(ts))
	for i := range ts {
		us[i] = f(ts[i])
	}
	return us
}

func GetJSONFromBody(c *gin.Context) ([]byte, error) {
	// Read the Body content
	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		return nil, err // Handle error
	}

	// The body should only be read once, so we need to re-assign a new reader to c.Request.Body
	c.Request.Body = io.NopCloser(bytes.NewReader(body))

	// Return the body as a byte slice
	return body, nil
}
