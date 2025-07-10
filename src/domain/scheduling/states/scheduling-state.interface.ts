import { Scheduling } from '../entities/scheduling.entity'

export abstract class SchedulingState {
	abstract changeStatus(scheduling: Scheduling, status: SchedulingState): SchedulingState
	abstract get name(): string
}
