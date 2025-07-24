import { DomainError } from '@/core/errors/domain.error'

export class GenerateStrategyNotFoundError extends DomainError {
	constructor() {
		super('GENERATE_STRATEGY_NOT_FOUND_ERROR', 401)
	}
}
