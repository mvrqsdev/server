import { DomainError } from '@/core/errors/domain.error'

export class GetAuthenticationStrategyNotFoundError extends DomainError {
	constructor() {
		super('GET_AUTHENTICATION_STRATEGY_NOT_FOUND', 401)
	}
}
