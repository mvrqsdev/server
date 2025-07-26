import { DomainError } from '@/core/errors/domain.error'

export class GetManyInstancesStrategyNotFoundError extends DomainError {
	constructor() {
		super('GET_MANY_INSTANCES_STRATEGY_NOT_FOUND', 401)
	}
}
