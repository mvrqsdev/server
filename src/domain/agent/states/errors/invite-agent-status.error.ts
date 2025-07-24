import { DomainError } from '@/core/errors/domain.error'

export class InviteAgentStatusError extends DomainError {
	constructor() {
		super('INVITE_AGENT_STATUS_ERROR', 401)
	}
}
