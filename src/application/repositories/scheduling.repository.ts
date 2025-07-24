import { Scheduling } from '@/domain/scheduling/entities/scheduling.entity'

export abstract class SchedulingRepository {
	abstract create(scheduling: Scheduling): Promise<void>
	abstract save(scheduling: Scheduling): Promise<void>
}
