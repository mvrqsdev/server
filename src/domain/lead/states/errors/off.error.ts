import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class OffError extends DomainError {
	constructor() {
		super(ErrorCodes.LEAD.LEAD_STATE.OFF.DEFAULT, 403)
	}
}
