import { ErrorCodes } from '@/core/errors/codes'
import { UseCaseError } from '@/core/errors/use-case-error'

export class AgentInvalidCredentialsError extends Error implements UseCaseError {
	constructor() {
		super(ErrorCodes.AGENT.INVALID_CREDENTIALS)
	}
}
