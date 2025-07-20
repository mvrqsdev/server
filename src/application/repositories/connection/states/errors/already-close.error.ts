import { DomainError } from '@/core/errors/domain.error'

export class AlreadyCloseError extends DomainError {
	constructor() {
		super('ALREADY_CLOSE_ERROR', 401)
	}
}
