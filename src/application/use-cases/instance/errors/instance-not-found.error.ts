import { DomainError } from '@/core/errors/domain.error'

export class InstanceNotFoundError extends DomainError {
	constructor() {
		super('INSTANCE_NOT_FOUND', 404)
	}
}
