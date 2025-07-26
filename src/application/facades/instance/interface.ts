import { AuthenticationCreds } from '@whiskeysockets/baileys'

export interface InstanceCreate {
	name: string
	agentId: string
}

export interface InstanceUpdate {
	name?: string
	connection?: 'close' | 'connecting' | 'open'
	ownerJid?: string | null
	profileName?: string | null
	profilePicUrl?: string | null
	number?: string | null
	clientName?: string | null
	disconnectionAt?: Date
	agentId?: string | null
	session?: AuthenticationCreds | null
	lastQrCode?: string | null
}

export interface ManyInstancesFilter {
	name?: string
	connections?: string[]
	profileName?: string
	agentIds?: string[]
	start_created_at?: Date
	end_created_at?: Date
}
