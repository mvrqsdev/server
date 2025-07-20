import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class CreditAnalysisError extends DomainError {
	constructor() {
		super(ErrorCodes.LEAD.LEAD_STATE.CREDIT_ANALYSIS.DEFAULT, 403)
	}
}
