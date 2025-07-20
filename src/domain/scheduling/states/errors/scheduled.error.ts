import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class ScheduledError extends DomainError {
	constructor() {
		super(ErrorCodes.SCHEDULING.SCHEDULING_STATE.SCHEDULED.DEFAULT, 403)
	}
}
