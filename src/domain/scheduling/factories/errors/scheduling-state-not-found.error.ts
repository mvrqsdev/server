import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class SchedulingStateNotFoundError extends DomainError {
	constructor() {
		super(ErrorCodes.SCHEDULING.SCHEDULING_STATE.NOT_FOUND, 404)
	}
}
