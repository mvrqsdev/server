export interface AgentCreate {
	name: string
	email: string
	password: string
	master?: boolean
	roles: string[]
	status: 'Active' | 'Inactive' | 'Invited'
}
