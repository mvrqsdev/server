import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class SchedulingError extends DomainError {
	constructor() {
		super(ErrorCodes.LEAD.LEAD_STATE.SCHEDULING.DEFAULT, 403)
	}
}
