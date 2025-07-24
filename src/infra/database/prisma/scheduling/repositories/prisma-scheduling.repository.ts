import { Injectable } from '@nestjs/common'
import { SchedulingRepository } from '@/application/repositories/scheduling.repository'
import { Scheduling } from '@/domain/scheduling/entities/scheduling.entity'
import { PrismaService } from '../../prisma.service'
import { PrismaSchedulingMapper } from '../mappers/scheduling.prisma-mapper'

@Injectable()
export class PrismaSchedulingRepository implements SchedulingRepository {
	constructor(private prisma: PrismaService) {}

	async create(scheduling: Scheduling): Promise<void> {
		const data = PrismaSchedulingMapper.toPrisma(scheduling)
		await this.prisma.scheduling.create({ data })
	}
	async save(scheduling: Scheduling): Promise<void> {
		const data = PrismaSchedulingMapper.toPrisma(scheduling)
		await this.prisma.scheduling.update({
			where: {
				id: data.id,
			},
			data,
		})
	}
}
