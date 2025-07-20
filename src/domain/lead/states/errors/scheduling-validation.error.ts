import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class SchedulingValidationError extends DomainError {
	constructor() {
		super(ErrorCodes.LEAD.LEAD_STATE.SCHEDULING.VALIDATION_ERROR, 403)
	}
}
