import { DomainError } from '@/core/errors/domain.error'

export class NecessaryOpenConnectionError extends DomainError {
	constructor() {
		super('NECESSARY_OPEN_CONNECTION_ERROR', 401)
	}
}
