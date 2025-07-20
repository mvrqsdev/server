import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class FolderValidationError extends DomainError {
	constructor() {
		super(ErrorCodes.LEAD.LEAD_STATE.SERVICE.VALIDATION_ERROR, 403)
	}
}
