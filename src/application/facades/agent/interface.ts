export interface AgentCreate {
	name: string
	email: string
	password: string
	roles: string[]
}

export interface AgentUpdate {
	agentId: string
	name?: string
	email?: string
	password?: string
	roles?: string[]
}
