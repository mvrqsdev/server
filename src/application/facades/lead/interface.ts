export interface LeadCreate {
	contactId: string
	agentId?: string | null
}

export interface LeadUpdate {
	agentId?: string | null
	converted?: boolean
	status?: string
	value?: number
}
