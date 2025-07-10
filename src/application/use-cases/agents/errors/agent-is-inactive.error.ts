import { UseCaseError } from '@/core/errors/use-case-error'

export class AgentIsInactiveError extends Error implements UseCaseError {
	constructor() {
		super(`This Agent is inactive.`)
	}
}
