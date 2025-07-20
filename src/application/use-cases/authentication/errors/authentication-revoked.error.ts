import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class AuthenticationRevokedError extends DomainError {
	constructor() {
		super(ErrorCodes.AUTHENTICATION.REVOKED, 401)
	}
}
