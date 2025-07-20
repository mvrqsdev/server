import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class VisitError extends DomainError {
	constructor() {
		super(ErrorCodes.LEAD.LEAD_STATE.VISIT.DEFAULT, 403)
	}
}
