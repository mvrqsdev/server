import { DomainError } from '@/core/errors/domain.error'

export class GetManyAgentsStrategyNotFoundError extends DomainError {
	constructor() {
		super('GET_MANY_AGENTS_STRATEGY_NOT_FOUND', 401)
	}
}
