import { ErrorCodes } from '@/core/errors/codes'
import { UseCaseError } from '@/core/errors/use-case-error'

export class AgentMasterRequiredError extends Error implements UseCaseError {
	constructor() {
		super(ErrorCodes.AGENT.MASTER.NOT_FOUND)
	}
}
