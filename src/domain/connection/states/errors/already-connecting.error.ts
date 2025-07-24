import { DomainError } from '@/core/errors/domain.error'

export class AlreadyConnectingError extends DomainError {
	constructor() {
		super('ALREADY_CONNECTING_ERROR', 401)
	}
}
