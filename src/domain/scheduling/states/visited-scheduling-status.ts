import { DomainError } from '@/core/errors/errors/domain.error'
import { Scheduling } from '../entities/scheduling.entity'
import { SchedulingState } from './scheduling-state.interface'

export class VisitedState extends SchedulingState {
	get name(): string {
		return 'Visited'
	}
	changeStatus(scheduling: Scheduling, newStatus: SchedulingState): SchedulingState {
		throw new DomainError('The Lead is still in the visit status.')
	}
}
