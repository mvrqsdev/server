import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class VisitedError extends DomainError {
	constructor() {
		super(ErrorCodes.SCHEDULING.SCHEDULING_STATE.VISITED.DEFAULT, 403)
	}
}
