import { DomainError } from '@/core/errors/errors/domain.error'
import { Scheduling } from '../entities/scheduling.entity'
import { Scheduled } from './scheduled-status'
import { SchedulingState } from './scheduling-state.interface'

export class Visited implements SchedulingState {
	public get state(): string {
		return this.constructor.name
	}
	Scheduled(scheduling: Scheduling): void {
		scheduling.status = new Scheduled()
	}
	Visited(scheduling: Scheduling): void {
		throw new DomainError('Method not implemented.')
	}
}
