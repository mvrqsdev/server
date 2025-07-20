import { DomainError } from '@/core/errors/domain.error'

export class TokenNotFoundError extends DomainError {
	constructor() {
		super('TOKEN_NOT_FOUND_ERROR', 404)
	}
}
