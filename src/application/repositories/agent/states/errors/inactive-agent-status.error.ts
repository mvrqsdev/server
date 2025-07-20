import { DomainError } from '@/core/errors/domain.error'

export class InactiveAgentStatusError extends DomainError {
	constructor() {
		super('INACTIVE_AGENT_STATUS_ERROR', 401)
	}
}
