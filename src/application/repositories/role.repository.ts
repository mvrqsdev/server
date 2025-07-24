import { Agent } from '@/domain/agent/entities/agent.entity'
import { Role } from '@/domain/role/entities/role.entity'

export abstract class RoleRepository {
	abstract findById(id: string): Promise<Role | null>
	abstract findByName(name: string): Promise<Role | null>
	abstract findManyByIds(roleIds: string[]): Promise<Role[]>
	abstract findManyByAgent(agent: Agent): Promise<Role[]>

	abstract addRolesToAgent(agent: Agent, roles: Role[]): Promise<void>
	abstract removeRolesFromAgent(agent: Agent, roles: Role[]): Promise<void>

	abstract create(role: Role): Promise<void>
	abstract save(role: Role): Promise<void>
}
