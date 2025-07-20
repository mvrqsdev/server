import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class AuthenticationExpiredError extends DomainError {
	constructor() {
		super(ErrorCodes.AUTHENTICATION.EXPIRED, 401)
	}
}
