import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class ServiceValidationError extends DomainError {
	constructor() {
		super(ErrorCodes.LEAD.LEAD_STATE.FOLDER.VALIDATION_ERROR, 403)
	}
}
