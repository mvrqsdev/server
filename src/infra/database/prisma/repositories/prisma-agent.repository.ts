import { Injectable } from '@nestjs/common'
import { AgentRepository } from '@/application/repositories/agents/agent.repository'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentDetails } from '@/domain/agent/value-objects/agent-details.value-object'
import { PrismaAgentMapper } from '../mappers/prisma-agent.mapper'
import { PrismaAgentDetailsMapper } from '../mappers/prisma-agent-details.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAgentRepository implements AgentRepository {
	constructor(private prisma: PrismaService) {}
	async findMaster(): Promise<Agent | null> {
		const master = await this.prisma.user.findFirst({
			where: {
				master: true,
			},
		})

		if (!master) {
			return null
		}

		return PrismaAgentMapper.toDomain(master)
	}
	async findDetailsById(id: string): Promise<AgentDetails | null> {
		const agent = await this.prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				Connection: true,
			},
		})

		if (!agent) {
			return null
		}

		return PrismaAgentDetailsMapper.toDomain(agent)
	}
	async findAdmins(): Promise<Agent[]> {
		const agents = await this.prisma.user.findMany({
			where: {
				role: 'Admin',
			},
		})

		return agents.map(PrismaAgentMapper.toDomain)
	}
	async findAgentsInRotation(): Promise<Agent[]> {
		const agents = await this.prisma.user.findMany({
			where: {
				status: 'Active',
				isInRotation: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		})

		return agents.map(PrismaAgentMapper.toDomain)
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
