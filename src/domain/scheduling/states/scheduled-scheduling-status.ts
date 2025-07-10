import { DomainError } from '@/core/errors/errors/domain.error'
import { Scheduling } from '../entities/scheduling.entity'
import { SchedulingState } from './scheduling-state.interface'
import { VisitedState } from './visited-scheduling-status'

export class ScheduledState extends SchedulingState {
	get name(): string {
		return 'Scheduled'
	}
	changeStatus(scheduling: Scheduling, newStatus: SchedulingState): SchedulingState {
		if (newStatus instanceof VisitedState) {
			return newStatus
		}

		throw new DomainError('The Lead is still in the visit status.')
	}
}
