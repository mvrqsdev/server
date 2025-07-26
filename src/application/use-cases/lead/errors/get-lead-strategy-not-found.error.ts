import { DomainError } from '@/core/errors/domain.error'

export class GetLeadStrategyNotFoundError extends DomainError {
	constructor() {
		super('GET_LEAD_STRATEGY_NOT_FOUND_ERROR', 404)
	}
}
