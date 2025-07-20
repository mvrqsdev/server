import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class PreServiceError extends DomainError {
	constructor() {
		super(ErrorCodes.LEAD.LEAD_STATE.PRE_SERVICE.DEFAULT, 403)
	}
}
