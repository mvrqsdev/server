import { DomainError } from '@/core/errors/domain.error'

export class AgentNotFoundWithThisEmailError extends DomainError {
	constructor() {
		super('AGENT_NOT_FOUND_WITH_THIS_EMAIL', 404)
	}
}
