import { ErrorCodes } from '@/core/errors/codes'
import { UseCaseError } from '@/core/errors/use-case-error'

export class AgentAlreadyExistsError extends Error implements UseCaseError {
	constructor() {
		super(ErrorCodes.AGENT.ALREADY_EXISTS)
	}
}
