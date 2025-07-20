import { DomainError } from '@/core/errors/domain.error'

export class AgentAlreadyExistsWithSameEmailError extends DomainError {
	constructor() {
		super('AGENT_ALREADY_EXISTS_WITH_SAME_EMAIL', 401)
	}
}
