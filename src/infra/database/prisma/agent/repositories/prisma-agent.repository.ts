import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import {
	AgentRepository,
	FindManyFiltersProps,
} from '@/application/repositories/agent/agent.repository'
import { RoleRepository } from '@/application/repositories/role/role.repository'
import { DomainEvents } from '@/core/events/domain-events'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentDetails } from '@/domain/agent/value-objects/agent-details.value-object'
import { Role } from '@/domain/role/entities/role.entity'
import { PrismaService } from '../../prisma.service'
import { PrismaAgentMapper } from '../mappers/agent.prisma-mapper'
import { PrismaAgentDetailsMapper } from '../mappers/agent-details.prisma-mapper'

@Injectable()
export class PrismaAgentRepository implements AgentRepository {
	constructor(
		private prisma: PrismaService,
		private agentMapper: PrismaAgentMapper,
		private agentDetailsMapper: PrismaAgentDetailsMapper,
		@Inject(forwardRef(() => RoleRepository))
		private roleRepository: RoleRepository,
	) {}
	async findManyByRole(role: Role): Promise<Agent[]> {
		const agents = await this.prisma.user.findMany({
			where: {
				Roles: {
					some: {
						Role: {
							id: role.id.toString(),
						},
					},
				},
			},
		})
		return agents.map((agent) => this.agentMapper.toDomain(agent))
	}
	async findManyByIds(agentIds: string[]): Promise<Agent[]> {
		const agents = await this.prisma.user.findMany({
			where: {
				id: {
					in: agentIds,
				},
			},
		})
		return agents.map((agent) => this.agentMapper.toDomain(agent))
	}
	async addAgentsToRole(role: Role, agents: Agent[]): Promise<void> {
		if (agents.length === 0) return
		const data: Prisma.UserRoleCreateManyInput[] = agents.map((agent) => ({
			roleId: role.id.toString(),
			agentId: agent.id.toString(),
		}))
		await this.prisma.userRole.createMany({
			data,
		})
	}
	async removeAgentsFromRole(role: Role, agents: Agent[]): Promise<void> {
		if (agents.length === 0) return
		const where: Prisma.UserRoleWhereInput = {
			roleId: role.id.toString(),
			agentId: {
				in: agents.map((agent) => agent.id.toString()),
			},
		}
		await this.prisma.userRole.deleteMany({ where })
	}
	async findManyByFilters({
		name,
		email,
		master,
		rotation,
		roles,
		status,
		startCreatedAt,
		endCreatedAt,
		startUpdatedAt,
		endUpdatedAt,
		page = 1,
		limit = 20,
		field = 'createdAt',
		direction = 'desc',
	}: FindManyFiltersProps): Promise<Agent[]> {
		const where: Prisma.UserWhereInput = {}
		if (name) {
			where.name = {
				contains: name,
				mode: 'insensitive',
			}
		}

		if (email) {
			where.email = {
				contains: email,
				mode: 'insensitive',
			}
		}

		if (typeof master === 'boolean') {
			where.master = {
				equals: master,
			}
		}

		if (typeof rotation === 'boolean') {
			where.isInRotation = {
				equals: rotation,
			}
		}

		if (roles && roles.length > 0) {
			where.Roles = {
				some: {
					roleId: {
						in: roles,
					},
				},
			}
		}

		if (status && status.length > 0) {
			where.status = {
				in: status,
			}
		}

		if (startCreatedAt || endCreatedAt) {
			where.createdAt = {
				...(startCreatedAt && { gte: startCreatedAt }),
				...(endCreatedAt && { lte: endCreatedAt }),
			}
		}

		if (startUpdatedAt || endUpdatedAt) {
			where.updatedAt = {
				...(startUpdatedAt && { gte: startUpdatedAt }),
				...(endUpdatedAt && { lte: endUpdatedAt }),
			}
		}

		const orderBy: Prisma.UserOrderByWithRelationInput = {
			[field]: direction,
		}

		const agents = await this.prisma.user.findMany({
			where,
			orderBy,
			skip: (page - 1) * limit,
			take: limit,
		})

		return agents.map((agent) => this.agentMapper.toDomain(agent))
	}

	async findByEmail(email: string): Promise<Agent | null> {
		const agent = await this.prisma.user.findUnique({
			where: {
				email,
			},
		})
		if (!agent) {
			return null
		}

		return this.agentMapper.toDomain(agent)
	}
	async findById(id: string): Promise<Agent | null> {
		const agent = await this.prisma.user.findUnique({
			where: {
				id,
			},
		})

		if (!agent) {
			return null
		}

		return this.agentMapper.toDomain(agent)
	}
	async findDetailsById(id: string): Promise<AgentDetails | null> {
		const agent = await this.prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				Authentications: true,
				Connection: true,
				Leads: true,
				LeadsMessage: true,
				Schedulings: true,
			},
		})
		if (!agent) {
			return null
		}

		return this.agentDetailsMapper.toDomain(agent)
	}

	async create(agent: Agent): Promise<void> {
		const data = this.agentMapper.toPrisma(agent)
		await this.prisma.user.create({ data })
		await this.roleRepository.addRolesToAgent(agent, agent.roles.getItems())
	}

	async save(agent: Agent): Promise<void> {
		const data = this.agentMapper.toPrisma(agent)
		await this.prisma.user.update({
			where: {
				id: data.id,
			},
			data,
		})
		await Promise.all([
			this.roleRepository.addRolesToAgent(agent, agent.roles.getNewItems()),
			this.roleRepository.removeRolesFromAgent(agent, agent.roles.getRemovedItems()),
		])

		DomainEvents.dispatchEventsForAggregate(agent.id)
	}
}
