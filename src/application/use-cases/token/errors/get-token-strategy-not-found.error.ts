import { DomainError } from '@/core/errors/domain.error'

export class GetTokenStrategyNotFoundError extends DomainError {
	constructor() {
		super('GET_TOKEN_STRATEGY_NOT_FOUND', 401)
	}
}
