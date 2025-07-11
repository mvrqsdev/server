import { DomainError } from '@/core/errors/errors/domain.error'
import { Scheduling } from '../entities/scheduling.entity'
import { SchedulingState } from './scheduling-state.interface'
import { Visited } from './visited-status'

export class Scheduled implements SchedulingState {
	public get state(): string {
		return this.constructor.name
	}
	Scheduled(scheduling: Scheduling): void {
		throw new DomainError('Method not implemented.')
	}
	Visited(scheduling: Scheduling): void {
		scheduling.status = new Visited()
	}
}
