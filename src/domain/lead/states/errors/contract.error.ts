import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class ContractError extends DomainError {
	constructor() {
		super(ErrorCodes.LEAD.LEAD_STATE.CONTRACT.DEFAULT, 403)
	}
}
