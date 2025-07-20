import { DomainError } from '@/core/errors/domain.error'

export class AlreadyOpenError extends DomainError {
	constructor() {
		super('ALREADY_OPEN_ERROR', 401)
	}
}
