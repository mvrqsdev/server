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
		private schedulingRepository: SchedulingRepository,
	) {}

	async create(lead: Lead): Promise<void> {
		const data = PrismaLeadMapper.toPrisma(lead)
		await this.prisma.lead.create({ data })
		// await this.schedulingRepository.createMany(lead.schedulings.getItems())
	}

	async save(lead: Lead): Promise<void> {
		const data = PrismaLeadMapper.toPrisma(lead)

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
