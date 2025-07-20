import { Scheduling } from '../entities/scheduling.entity'
import { ScheduledError } from './errors/scheduled.error'
import { SchedulingState } from './scheduling-state.interface'
import { Visited } from './visited-status'

export class Scheduled implements SchedulingState {
	public get state(): string {
		return this.constructor.name
	}
	Scheduled(scheduling: Scheduling): void {
		throw new ScheduledError()
	}
	Visited(scheduling: Scheduling): void {
		scheduling.status = new Visited()
	}
}
