import { DomainError } from '@/core/errors/domain.error'

export class GetManyIAMessagesStrategyNotFoundError extends DomainError {
	constructor() {
		super('GET_MANY_IA_MESSAGES_STRATEGY_NOT_FOUND', 401)
	}
}
