import { DomainError } from '@/core/errors/domain.error'

export class GetContactStrategyNotFoundError extends DomainError {
	constructor() {
		super('GET_CONTACT_STRATEGY_NOT_FOUND_ERROR', 404)
	}
}
