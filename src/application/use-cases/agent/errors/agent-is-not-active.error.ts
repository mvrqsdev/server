import { DomainError } from '@/core/errors/domain.error'

export class AgentIsNotActiveError extends DomainError {
	constructor() {
		super('AGENT_IS_NOT_ACTIVE_ERROR', 401)
	}
}
