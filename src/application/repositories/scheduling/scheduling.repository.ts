import { Scheduling } from '@/domain/scheduling/entities/scheduling.entity'

export abstract class SchedulingRepository {
	abstract findById(id: string): Promise<Scheduling | null>
	abstract findManyByLeadId(leadId: string): Promise<Scheduling[]>
	abstract createMany(schedulings: Scheduling[]): Promise<void>
	abstract updateMany(schedulings: Scheduling[]): Promise<void>
	abstract create(scheduling: Scheduling): Promise<void>
	abstract save(scheduling: Scheduling): Promise<void>
}
