import { DomainError } from '@/core/errors/domain.error'

export class ActiveAgentStatusError extends DomainError {
	constructor() {
		super('ACTIVE_AGENT_STATUS_ERROR', 401)
	}
}
