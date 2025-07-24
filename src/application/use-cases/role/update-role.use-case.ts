import { Injectable } from '@nestjs/common'
import { AgentRepository } from '@/application/repositories/agent.repository'
import { PermissionRepository } from '@/application/repositories/permission.repository'
import { RoleRepository } from '@/application/repositories/role.repository'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { Role } from '@/domain/role/entities/role.entity'
import { RoleAgents } from '@/domain/role/entities/role-agents.watched-list'
import { RolePermissions } from '@/domain/role/entities/role-permissions.watched-list'
import { HexColor } from '@/domain/role/value-objects/hex-color.value-object'
import { AgentNotFoundError } from '../agent/errors/agent-not-found.error'
import { PermissionNotFoundError } from '../permissions/errors/permission-not-found.error'
import { RoleAlreadyExistsWithSameNameError } from './errors/role-already-exists-with-same-name.error'
import { RoleNotFoundError } from './errors/role-not-found.error'

interface UpdateRoleUseCaseRequest {
	roleId: string
	name?: string
	description?: string | null
	color?: string
	agents?: string[]
	permissions?: string[]
}

interface UpdateRoleUseCaseResponse {
	role: Role
}
@Injectable()
export class UpdateRoleUseCase
	implements BaseUseCase<UpdateRoleUseCaseRequest, UpdateRoleUseCaseResponse>
{
	constructor(
		private roleRepository: RoleRepository,
		private agentRepository: AgentRepository,
		private permissionRepository: PermissionRepository,
	) {}
	async execute({
		roleId,
		name,
		description,
		color,
		agents,
		permissions,
	}: UpdateRoleUseCaseRequest): Promise<UpdateRoleUseCaseResponse> {
		const role = await this.roleRepository.findById(roleId)

		if (!role) {
			throw new RoleNotFoundError()
		}

		if (name) {
			const roleWithSameName = await this.roleRepository.findByName(name)

			if (roleWithSameName) {
				const isSameRole = roleWithSameName.id.equals(role.id)

				if (!isSameRole) {
					throw new RoleAlreadyExistsWithSameNameError()
				}
				role.name = name
			}
		}

		if (description !== undefined) {
			role.description = description
		}

		if (color) {
			role.color = HexColor.create(color)
		}

		if (agents) {
			const currentRoleAgents = await this.agentRepository.findManyByRole(role)
			const roleAgents = new RoleAgents(currentRoleAgents)

			const fetchedAgents = await this.agentRepository.findManyByIds(agents)
			if (fetchedAgents.length !== agents.length) {
				throw new AgentNotFoundError()
			}
			roleAgents.update(fetchedAgents)

			role.agents = roleAgents
		}

		if (permissions) {
			const currentRolePermissions = await this.permissionRepository.findManyByRole(role)
			const rolePermissions = new RolePermissions(currentRolePermissions)

			const fetchedPermissions =
				await this.permissionRepository.findManyByIds(permissions)
			if (fetchedPermissions.length !== permissions.length) {
				throw new PermissionNotFoundError()
			}
			rolePermissions.update(fetchedPermissions)

			role.permissions = rolePermissions
		}

		await this.roleRepository.save(role)

		return {
			role,
		}
	}
}
