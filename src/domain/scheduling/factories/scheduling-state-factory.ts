import { DomainError } from '@/core/errors/errors/domain.error'
import { Scheduled } from '../states/scheduled-status'
import { SchedulingState } from '../states/scheduling-state.interface'
import { Visited } from '../states/visited-status'

export class SchedulingStateFactory {
	static create(status: string): SchedulingState {
		if (status === 'Scheduled') {
			return new Scheduled()
		}

		if (status === 'Visited') {
			return new Visited()
		}

		throw new DomainError('Scheduling state not found.')
	}
}
