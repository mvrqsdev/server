import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class VisitValidationError extends DomainError {
	constructor() {
		super(ErrorCodes.LEAD.LEAD_STATE.VISIT.VALIDATION_ERROR, 403)
	}
}
