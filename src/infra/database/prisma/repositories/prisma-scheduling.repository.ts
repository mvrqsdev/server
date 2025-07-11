import { Injectable } from '@nestjs/common'
import { SchedulingRepository } from '@/application/repositories/scheduling/scheduling.repository'
import { Scheduling } from '@/domain/scheduling/entities/scheduling.entity'
import { PrismaSchedulingMapper } from '../mappers/prisma-scheduling.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaSchedulingRepository implements SchedulingRepository {
	constructor(private prisma: PrismaService) {}
	async updateMany(schedulings: Scheduling[]): Promise<void> {
		if (schedulings.length === 0) {
			return
		}

		const updates = PrismaSchedulingMapper.toPrismaUpdateMany(schedulings)
		await Promise.all(
			updates.map((scheduling) => this.prisma.scheduling.update(scheduling)),
		)
	}
	async createMany(schedulings: Scheduling[]): Promise<void> {
		if (schedulings.length === 0) {
			return
		}

		const data = PrismaSchedulingMapper.toPrismaCreateMany(schedulings)

		await this.prisma.scheduling.createMany(data)
	}
	async findById(id: string): Promise<Scheduling | null> {
		const scheduling = await this.prisma.scheduling.findUnique({
			where: {
				id,
			},
		})

		if (!scheduling) {
			return null
		}

		return PrismaSchedulingMapper.toDomain(scheduling)
	}
	async findManyByLeadId(leadId: string): Promise<Scheduling[]> {
		const schedulings = await this.prisma.scheduling.findMany({
			where: {
				leadId,
			},
		})

		return schedulings.map(PrismaSchedulingMapper.toDomain)
	}
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
