import { DomainError } from '@/core/errors/domain.error'

export class RoleAlreadyExistsWithSameNameError extends DomainError {
	constructor() {
		super('ROLE_ALREADY_EXISTS_WITH_SAME_NAME', 401)
	}
}
