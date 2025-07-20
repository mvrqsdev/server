import { DomainError } from '@/core/errors/domain.error'

export class AgentNotFoundError extends DomainError {
	constructor() {
		super('AGENT_NOT_FOUND', 404)
	}
}
