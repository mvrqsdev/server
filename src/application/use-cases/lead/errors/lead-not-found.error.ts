import { DomainError } from '@/core/errors/domain.error'

export class LeadNotFoundError extends DomainError {
	constructor() {
		super('LEAD_NOT_FOUND_ERROR', 404)
	}
}
