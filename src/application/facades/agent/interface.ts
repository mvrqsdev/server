export interface AgentCreate {
	name: string
	email: string
	password: string
	roles: string[]
}

export interface AgentUpdate {
	name?: string
	email?: string
	password?: string
	roles?: string[]
	status?: 'Invited' | 'Inactive'
}
