import { DomainError } from '@/core/errors/domain.error'

export class ConnectionStateNotFoundError extends DomainError {
	constructor() {
		super('CONNECTION_STATE_NOT_FOUND_ERROR', 401)
	}
}
