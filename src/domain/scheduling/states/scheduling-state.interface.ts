import { Scheduling } from '../entities/scheduling.entity'

export abstract class SchedulingState {
	public get state() {
		return this.constructor.name
	}

	abstract Scheduled(scheduling: Scheduling): void
	abstract Visited(scheduling: Scheduling): void
}
