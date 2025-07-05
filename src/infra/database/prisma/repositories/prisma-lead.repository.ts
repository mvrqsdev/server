import { Injectable } from '@nestjs/common'
import { LeadRepository } from '@/domain/real-state/application/repositories/lead.repository'
import { Agent } from '@/domain/real-state/enterprise/entities/agent.entity'
import { Lead } from '@/domain/real-state/enterprise/entities/lead.entity'
import { PrismaLeadMapper } from '../mappers/prisma-lead.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaLeadRepository implements LeadRepository {
	constructor(private prisma: PrismaService) {}
	async findById(id: string): Promise<Lead | null> {
		const lead = await this.prisma.lead.findUnique({
			where: {
				id,
			},
		})

		if (!lead) {
			return null
		}

		return PrismaLeadMapper.toDomain(lead)
	}

	async findLastLeadByContactId(contactId: string): Promise<Lead | null> {
		const lead = await this.prisma.lead.findFirst({
			where: {
				contactId,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		if (!lead) {
			return null
		}

		return PrismaLeadMapper.toDomain(lead)
	}

	async findLastLeadFromAgents(agents: Agent[]): Promise<Lead | null> {
		const lead = await this.prisma.lead.findFirst({
			where: {
				agentId: {
					in: agents.map((agent) => agent.id.toString()),
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		if (!lead) {
			return null
		}

		return PrismaLeadMapper.toDomain(lead)
	}

	async create(lead: Lead): Promise<void> {
		const data = PrismaLeadMapper.toPrisma(lead)
		await this.prisma.lead.create({ data })
	}

	async save(lead: Lead): Promise<void> {
		const data = PrismaLeadMapper.toPrisma(lead)
		await this.prisma.lead.update({
			where: {
				id: data.id,
			},
			data,
		})
	}
}
