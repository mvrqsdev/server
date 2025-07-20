import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { AgentRepository } from '@/application/repositories/agent/agent.repository'
import { PermissionRepository } from '@/application/repositories/permission/permission.repository'
import { RoleRepository } from '@/application/repositories/role/role.repository'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { Role } from '@/domain/role/entities/role.entity'
import { PrismaService } from '../../prisma.service'
import { PrismaRoleMapper } from '../mappers/role.prisma-mapper'

@Injectable()
export class PrismaRoleRepository implements RoleRepository {
	constructor(
		private prisma: PrismaService,
		private roleMapper: PrismaRoleMapper,
		@Inject(forwardRef(() => AgentRepository))
		private agentRepository: AgentRepository,
		@Inject(forwardRef(() => PermissionRepository))
		private permissionRepository: PermissionRepository,
	) {}
	async findByName(name: string): Promise<Role | null> {
		const role = await this.prisma.role.findUnique({ where: { name } })
		if (!role) {
			return null
		}
		return this.roleMapper.toDomain(role)
	}
	async findManyByAgent(agent: Agent): Promise<Role[]> {
		const roles = await this.prisma.role.findMany({
			where: {
				Agents: {
					some: {
						Agent: {
							id: agent.id.toString(),
						},
					},
				},
			},
		})

		return roles.map((role) => this.roleMapper.toDomain(role))
	}

	async findManyByIds(roleIds: string[]): Promise<Role[]> {
		const roles = await this.prisma.role.findMany({
			where: {
				id: {
					in: roleIds,
				},
			},
		})
		return roles.map((role) => this.roleMapper.toDomain(role))
	}

	async addRolesToAgent(agent: Agent, roles: Role[]): Promise<void> {
		if (roles.length === 0) return

		const data: Prisma.UserRoleCreateManyInput[] = roles.map((role) => ({
			agentId: agent.id.toString(),
			roleId: role.id.toString(),
		}))
		await this.prisma.userRole.createMany({
			data,
		})
	}

	async removeRolesFromAgent(agent: Agent, roles: Role[]): Promise<void> {
		if (roles.length === 0) return

		const where: Prisma.UserRoleWhereInput = {
			agentId: agent.id.toString(),
			roleId: {
				in: roles.map((role) => role.id.toString()),
			},
		}

		await this.prisma.userRole.deleteMany({ where })
	}

	async findById(id: string): Promise<Role | null> {
		const role = await this.prisma.role.findUnique({
			where: {
				id,
			},
		})

		if (!role) {
			return null
		}

		return this.roleMapper.toDomain(role)
	}
	async create(role: Role): Promise<void> {
		const data = this.roleMapper.toPrisma(role)
		await this.prisma.role.create({ data })
		await Promise.all([
			this.agentRepository.addAgentsToRole(role, role.agents.getItems()),
			this.permissionRepository.addPermissionsToRole(role, role.permissions.getItems()),
		])
	}
	async save(role: Role): Promise<void> {
		const data = this.roleMapper.toPrisma(role)
		await this.prisma.role.update({
			where: {
				id: data.id,
			},
			data,
		})
		await Promise.all([
			this.agentRepository.addAgentsToRole(role, role.agents.getNewItems()),
			this.agentRepository.removeAgentsFromRole(role, role.agents.getRemovedItems()),
			this.permissionRepository.addPermissionsToRole(
				role,
				role.permissions.getNewItems(),
			),
			this.permissionRepository.removePermissionsFromRole(
				role,
				role.permissions.getRemovedItems(),
			),
		])
	}
}
