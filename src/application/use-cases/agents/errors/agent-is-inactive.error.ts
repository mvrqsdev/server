import { ErrorCodes } from '@/core/errors/codes'
import { UseCaseError } from '@/core/errors/use-case-error'

export class AgentIsInactiveError extends Error implements UseCaseError {
	constructor() {
		super(ErrorCodes.AGENT.INACTIVE)
	}
}
