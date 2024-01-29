package models

type TypeBotReply struct {
	Messages []TypeBotMessage     `json:"messages,omitempty"`
	Input    *TypebotInputMessage `json:"input,omitempty"`
}

type TypeBotMessage struct {
	ID      string  `json:"id,omitempty"`
	Type    string  `json:"type,omitempty"`
	Content Content `json:"content,omitempty"`
}

type Content struct {
	RichText []RichText `json:"richText,omitempty"`
}

type RichText struct {
	Type     string     `json:"type,omitempty"`
	Children []Children `json:"children,omitempty"`
}

type Children struct {
	Text      string     `json:"text,omitempty"`
	Bold      bool       `json:"bold,omitempty"`
	Italic    bool       `json:"italic,omitempty"`
	Underline bool       `json:"underline,omitempty"`
	URL       string     `json:"url,omitempty"`
	Type      string     `json:"type,omitempty"`
	Children  []Children `json:"children,omitempty"` // Nested structure for inline elements
}

type TypebotInputMessage struct {
	ID    string  `json:"id,omitempty"`
	Type  string  `json:"type,omitempty"`
	Items []Items `json:"items,omitempty"`
}

type Items struct {
	ID             string `json:"id,omitempty"`
	OutgoingEdgeID string `json:"outgoingEdgeId,omitempty"`
	Content        string `json:"content,omitempty"`
}
