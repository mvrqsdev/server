import { ErrorCodes } from '@/core/errors/codes'
import { UseCaseError } from '@/core/errors/use-case-error'

export class AgentNotFoundError extends Error implements UseCaseError {
	constructor() {
		super(ErrorCodes.AGENT.NOT_FOUND)
	}
}
