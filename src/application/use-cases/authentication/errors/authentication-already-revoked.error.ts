import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class AuthenticationAlreadyRevokedError extends DomainError {
	constructor() {
		super(ErrorCodes.AUTHENTICATION.ALREADY_REVOKED, 401)
	}
}
