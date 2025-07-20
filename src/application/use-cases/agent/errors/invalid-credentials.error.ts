import { DomainError } from '@/core/errors/domain.error'

export class InvalidCredentialsError extends DomainError {
	constructor() {
		super('INVALID_CREDENTIALS_ERROR', 401)
	}
}
