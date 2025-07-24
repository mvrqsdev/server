import { DomainError } from '@/core/errors/domain.error'

export class AgentStateNotFoundError extends DomainError {
	constructor() {
		super('AGENT_STATE_NOT_FOUND_ERROR', 401)
	}
}
