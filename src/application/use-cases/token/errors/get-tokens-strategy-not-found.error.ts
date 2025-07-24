import { DomainError } from '@/core/errors/domain.error'

export class GetTokensStrategyNotFoundError extends DomainError {
	constructor() {
		super('GET_TOKENS_STRATEGY_NOT_FOUND', 401)
	}
}
