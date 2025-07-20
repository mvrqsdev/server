import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class AuthenticationNotFoundError extends DomainError {
	constructor() {
		super(ErrorCodes.AUTHENTICATION.STRATEGY_NOT_FOUND, 404)
	}
}
