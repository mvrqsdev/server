export interface RoleCreate {
	name: string
	description?: string | null
	color: string
	agents: string[]
	permissions: string[]
}

export interface RoleUpdate {
	roleId: string
	name?: string
	description?: string | null
	color?: string
	agents?: string[]
	permissions?: string[]
}

export interface RoleDelete {
	roleId: string
}
