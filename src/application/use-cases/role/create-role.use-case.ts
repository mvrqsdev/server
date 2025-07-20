import { Injectable } from '@nestjs/common'
import { AgentRepository } from '@/application/repositories/agent/agent.repository'
import { PermissionRepository } from '@/application/repositories/permission/permission.repository'
import { RoleRepository } from '@/application/repositories/role/role.repository'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { Role } from '@/domain/role/entities/role.entity'
import { RoleAgents } from '@/domain/role/entities/role-agents.watched-list'
import { RolePermissions } from '@/domain/role/entities/role-permissions.watched-list'
import { HexColor } from '@/domain/role/value-objects/hex-color.value-object'
import { AgentNotFoundError } from '../agent/errors/agent-not-found.error'
import { PermissionNotFoundError } from '../permissions/errors/permission-not-found.error'

export interface CreateRoleUseCaseRequest {
	name: string
	description?: string | null
	color: string
	agents: string[]
	permissions: string[]
}

export interface CreateRoleUseCaseResponse {
	role: Role
}

@Injectable()
export class CreateRoleUseCase
	implements BaseUseCase<CreateRoleUseCaseRequest, CreateRoleUseCaseResponse>
{
	constructor(
		private roleRepository: RoleRepository,
		private agentRepository: AgentRepository,
		private permissionRepository: PermissionRepository,
	) {}
	async execute({
		name,
		description,
		color,
		agents,
		permissions,
	}: CreateRoleUseCaseRequest): Promise<CreateRoleUseCaseResponse> {
		const role = Role.create({
			name,
			description,
			color: HexColor.create(color),
		})

		const existingAgents = await this.agentRepository.findManyByIds(agents)
		if (existingAgents.length !== agents.length) {
			throw new AgentNotFoundError()
		}

		role.agents = new RoleAgents(existingAgents)

		const existingPermissions = await this.permissionRepository.findManyByIds(permissions)
		if (existingPermissions.length !== permissions.length) {
			throw new PermissionNotFoundError()
		}
		role.permissions = new RolePermissions(existingPermissions)

		await this.roleRepository.create(role)

		return {
			role,
		}
	}
}
