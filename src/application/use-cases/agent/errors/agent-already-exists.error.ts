import { DomainError } from '@/core/errors/domain.error'

export class AgentAlreadyExistsError extends DomainError {
	constructor() {
		super('AGENT_ALREADY_EXISTS', 401)
	}
}
