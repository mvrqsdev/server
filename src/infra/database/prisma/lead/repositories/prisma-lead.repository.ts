import { Injectable } from '@nestjs/common'
import { LeadRepository } from '@/application/repositories/lead.repository'
import { SchedulingRepository } from '@/application/repositories/scheduling.repository'
import { Lead } from '@/domain/lead/entities/lead.entity'
import { PrismaService } from '../../prisma.service'
import { PrismaLeadMapper } from '../mappers/lead.prisma-mapper'

@Injectable()
export class PrismaLeadRepository implements LeadRepository {
	constructor(
		private prisma: PrismaService,
		private leadMapper: PrismaLeadMapper,
		private schedulingRepository: SchedulingRepository,
	) {}
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

		return this.leadMapper.toDomain(lead)
	}
	async findById(id: string): Promise<Lead | null> {
		const lead = await this.prisma.lead.findUnique({
			where: {
				id,
			},
		})

		if (!lead) return null

		return this.leadMapper.toDomain(lead)
	}

	async create(lead: Lead): Promise<void> {
		const data = this.leadMapper.toPrisma(lead)
		await this.prisma.lead.upsert({
			where: { id: lead.id.toString() },
			create: data,
			update: data,
		})
		// await this.schedulingRepository.createMany(lead.schedulings.getItems())
	}

	async save(lead: Lead): Promise<void> {
		const data = this.leadMapper.toPrisma(lead)

		await Promise.all([
			await this.prisma.lead.update({
				where: {
					id: data.id,
				},
				data,
			}),
			// this.schedulingRepository.createMany(lead.schedulings.getNewItems()),
			// this.schedulingRepository.updateMany(lead.schedulings.getUpdatedItems()),
		])
	}
}
