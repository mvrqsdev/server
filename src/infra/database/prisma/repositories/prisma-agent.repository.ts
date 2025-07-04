import { Injectable } from '@nestjs/common'
import { AgentRepository } from '@/domain/real-state/application/repositories/agent.repository'
import { Agent } from '@/domain/real-state/enterprise/entities/agent.entity'
import { PrismaAgentMapper } from '../mappers/prisma-agent.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAgentRepository implements AgentRepository {
	constructor(private prisma: PrismaService) {}

	async findById(id: string): Promise<Agent | null> {
		const agent = await this.prisma.user.findUnique({
			where: {
				id,
			},
		})

		if (!agent) {
			return null
		}

		return PrismaAgentMapper.toDomain(agent)
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

		return PrismaAgentMapper.toDomain(agent)
	}

	async create(agent: Agent): Promise<void> {
		const data = PrismaAgentMapper.toPrisma(agent)
		await this.prisma.user.create({ data })
	}

	async save(agent: Agent): Promise<void> {
		const data = PrismaAgentMapper.toPrisma(agent)
		await this.prisma.user.update({
			where: {
				id: data.id,
			},
			data,
		})
	}
}
