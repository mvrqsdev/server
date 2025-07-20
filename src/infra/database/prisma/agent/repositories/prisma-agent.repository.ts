import { Injectable } from '@nestjs/common'
import { AgentRepository } from '@/application/repositories/agent/agent.repository'
import { DomainEvents } from '@/core/events/domain-events'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentDetails } from '@/domain/agent/value-objects/agent-details.value-object'
import { PrismaService } from '../../prisma.service'
import { PrismaAgentMapper } from '../mappers/agent.prisma-mapper'
import { PrismaAgentDetailsMapper } from '../mappers/agent-details.prisma-mapper'

@Injectable()
export class PrismaAgentRepository implements AgentRepository {
	constructor(
		private prisma: PrismaService,
		private agentMapper: PrismaAgentMapper,
		private agentDetailsMapper: PrismaAgentDetailsMapper,
	) {}

	async findByEmail(email: string): Promise<Agent | null> {
		await this.prisma.user.findMany({})
		throw new Error('Method not implemented.')
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
	}

	async save(agent: Agent): Promise<void> {
		const data = this.agentMapper.toPrisma(agent)
		await this.prisma.user.update({
			where: {
				id: data.id,
			},
			data,
		})

		DomainEvents.dispatchEventsForAggregate(agent.id)
	}
}
