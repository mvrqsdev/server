import { DomainError } from '@/core/errors/domain.error'

export class TokenAlreadyUsedError extends DomainError {
	constructor() {
		super('TOKEN_ALREADY_USED_ERROR', 401)
	}
}
