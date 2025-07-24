import { DomainError } from '@/core/errors/domain.error'

export class GetValidateStrategyNotFoundError extends DomainError {
	constructor() {
		super('GET_VALIDATE_STRATEGY_NOT_FOUND', 401)
	}
}
