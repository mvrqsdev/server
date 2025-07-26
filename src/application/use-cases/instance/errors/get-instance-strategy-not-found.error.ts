import { DomainError } from '@/core/errors/domain.error'

export class GetInstanceStrategyNotFoundError extends DomainError {
	constructor() {
		super('GET_INSTANCE_STRATEGY_NOT_FOUND', 401)
	}
}
