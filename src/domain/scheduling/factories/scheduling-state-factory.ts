import { Scheduled } from '../states/scheduled-status'
import { SchedulingState } from '../states/scheduling-state.interface'
import { Visited } from '../states/visited-status'
import { SchedulingStateNotFoundError } from './errors/scheduling-state-not-found.error'

export class SchedulingStateFactory {
	static create(status: string): SchedulingState {
		if (status === 'Scheduled') {
			return new Scheduled()
		}

		if (status === 'Visited') {
			return new Visited()
		}

		throw new SchedulingStateNotFoundError()
	}
}
