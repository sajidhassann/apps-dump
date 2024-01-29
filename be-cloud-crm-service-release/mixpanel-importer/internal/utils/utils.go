package utils

func CreateBatch[K any](data []K, chunkSize int) [][]K {
	var divided [][]K
	for i := 0; i < len(data); i += chunkSize {
		end := i + chunkSize

		if end > len(data) {
			end = len(data)
		}

		divided = append(divided, data[i:end])
	}
	return divided
}
