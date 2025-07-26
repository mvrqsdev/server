export interface IAMessageCreateProps {
	leadId: string
	contactId: string
	content?: string | null
	mediaUrl?: string | null
	mediaKey?: string | null
	messageType: string
	fromBot: boolean
	sessionId: string
}

export interface IAMessageProcessProps {
	Latitude?: string
	Longitude?: string
	MediaContentType0?: string
	SmsMessageSid: string
	NumMedia: string
	ProfileName: string
	MessageType: string
	SmsSid: string
	WaId: string
	SmsStatus: string
	Label?: string
	Body: string
	To: string
	NumSegments: string
	ReferralNumMedia: string
	MessageSid: string
	AccountSid: string
	ChannelMetadata: string
	From: string
	MediaUrl0?: string
	ApiVersion: string
}

export interface IAMessageUpdateProps {
	content?: string | null
	mediaUrl?: string | null
	mediaKey?: string | null
}
