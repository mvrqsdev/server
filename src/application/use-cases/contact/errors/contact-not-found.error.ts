import { DomainError } from '@/core/errors/domain.error'

export class ContactNotFoundError extends DomainError {
	constructor() {
		super('CONTACT_NOT_FOUND_ERROR', 404)
	}
}
