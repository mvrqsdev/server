import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class LeadStateNotFoundError extends DomainError {
	constructor() {
		super(ErrorCodes.LEAD.LEAD_STATE.NOT_FOUND, 404)
	}
}
