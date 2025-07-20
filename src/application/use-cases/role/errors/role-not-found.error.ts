import { DomainError } from '@/core/errors/domain.error'

export class RoleNotFoundError extends DomainError {
	constructor() {
		super('ROLE_NOT_FOUND_ERROR', 401)
	}
}
