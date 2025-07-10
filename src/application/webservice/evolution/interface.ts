export type EvolutionEvents =
	| 'APPLICATION_STARTUP'
	| 'QRCODE_UPDATED'
	| 'MESSAGES_SET'
	| 'MESSAGES_UPSERT'
	| 'MESSAGES_UPDATE'
	| 'MESSAGES_DELETE'
	| 'SEND_MESSAGE'
	| 'CONTACTS_SET'
	| 'CONTACTS_UPSERT'
	| 'CONTACTS_UPDATE'
	| 'PRESENCE_UPDATE'
	| 'CHATS_SET'
	| 'CHATS_UPSERT'
	| 'CHATS_UPDATE'
	| 'CHATS_DELETE'
	| 'GROUPS_UPSERT'
	| 'GROUP_UPDATE'
	| 'GROUP_PARTICIPANTS_UPDATE'
	| 'CONNECTION_UPDATE'
	| 'CALL'
	| 'NEW_JWT_TOKEN'
	| 'TYPEBOT_START'
	| 'TYPEBOT_CHANGE_STATUS'

export interface CreateInstanceRequest {
	instanceName: string
	integration: 'WHATSAPP-BAILEYS' | 'WHATSAPP-BUSINESS'
	token?: string
	qrcode?: boolean
	number?: string
	rejectCall?: boolean
	msgCall?: string
	groupsIgnore?: boolean
	alwaysOnline?: boolean
	readMessages?: boolean
	readStatus?: boolean
	syncFullHistory?: boolean
	proxyHost?: string
	proxyPort?: string
	proxyProtocol?: string
	proxyUsername?: string
	proxyPassword?: string
	webhook?: {
		url: string
		byEvents?: boolean
		base64?: boolean
		headers?: {
			authorization: string
			'Content-Type': string
		}
		events?: EvolutionEvents[]
	}
	rabbitmq?: {
		enabled: boolean
		events: EvolutionEvents[]
	}
	sqs?: {
		enabled: boolean
		events: EvolutionEvents[]
	}
	chatwootAccountId?: number
	chatwootToken?: string
	chatwootUrl?: string
	chatwootSignMsg?: string
	chatwootReopenConversation?: boolean
	chatwootConversationPending?: boolean
	chatwootImportContacts?: boolean
	chatwootNameInbox?: string
	chatwootMergeBrazilContacts?: boolean
	chatwootImportMessages?: boolean
	chatwootDaysLimitImportMessages?: number
	chatwootOrganization?: string
	chatwootLogo?: string
}

export interface CreateInstanceResponse {
	instance: {
		instanceName: string
		instanceId: string
		integration: 'WHATSAPP-BAILEYS' | 'WHATSAPP-BUSINESS'
		status: string
	}
	hash: string
	webhook: {
		webhookUrl: string
	}
	qrcode: {
		code: string
		base64: string
	}
}
