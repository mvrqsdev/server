import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class ProposalError extends DomainError {
	constructor() {
		super(ErrorCodes.LEAD.LEAD_STATE.PROPOSAL.DEFAULT, 403)
	}
}
