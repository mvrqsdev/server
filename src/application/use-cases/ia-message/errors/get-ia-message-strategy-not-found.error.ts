import { DomainError } from '@/core/errors/domain.error'

export class GetIAMessageStrategyNotFoundError extends DomainError {
	constructor() {
		super('GET_IA_MESSAGE_STRATEGY_NOT_FOUND', 401)
	}
}
