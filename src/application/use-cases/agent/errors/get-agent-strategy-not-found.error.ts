import { DomainError } from '@/core/errors/domain.error'

export class GetAgentStrategyNotFoundError extends DomainError {
	constructor() {
		super('GET_AGENT_STRATEGY_NOT_FOUND', 401)
	}
}
