import { DomainError } from '@/core/errors/domain.error'

export class PermissionNotFoundError extends DomainError {
	constructor() {
		super('PERMISSION_NOT_FOUND', 404)
	}
}
