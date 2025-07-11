import { Prisma, Scheduling as PrismaScheduling } from '@prisma/client'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Scheduling } from '@/domain/scheduling/entities/scheduling.entity'
import { SchedulingStateFactory } from '@/domain/scheduling/factories/scheduling-state-factory'

export class PrismaSchedulingMapper {
	static toDomain(raw: PrismaScheduling): Scheduling {
		return Scheduling.create(
			{
				leadId: new UniqueEntityID(raw.id),
				agentId: new UniqueEntityID(raw.agentId),
				scheduled: raw.scheduled,
				status: SchedulingStateFactory.create(raw.status),
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}

	static toPrismaCreateMany(schedulings: Scheduling[]): Prisma.SchedulingCreateManyArgs {
		return {
			data: schedulings.map((scheduling) => ({
				id: scheduling.id.toString(),
				agentId: scheduling.agentId.toString(),
				leadId: scheduling.leadId.toString(),
				scheduled: scheduling.scheduled,
				status: scheduling.status.state,
			})),
		}
	}

	static toPrismaUpdateMany(schedulings: Scheduling[]): Prisma.SchedulingUpdateArgs[] {
		return schedulings.map((scheduling) => ({
			where: {
				id: scheduling.id.toString(),
			},
			data: {
				agentId: scheduling.agentId.toString(),
				leadId: scheduling.leadId.toString(),
				scheduled: scheduling.scheduled,
				status: scheduling.status.state,
			},
		}))
	}

	static toPrisma(scheduling: Scheduling): Prisma.SchedulingUncheckedCreateInput {
		return {
			id: scheduling.id.toString(),
			agentId: scheduling.agentId.toString(),
			leadId: scheduling.leadId.toString(),
			status: scheduling.status.state,
			scheduled: scheduling.scheduled,
			createdAt: scheduling.createdAt,
			updatedAt: scheduling.updatedAt,
		}
	}
}
