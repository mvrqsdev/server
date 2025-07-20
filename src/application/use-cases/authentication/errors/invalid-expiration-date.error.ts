import { DomainError } from '@/core/errors/domain.error'

export class InvalidExpirationDateError extends DomainError {
	constructor() {
		super('INVALID_EXPIRATION_DATE_ERROR', 401)
	}
}
