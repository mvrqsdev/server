import { UseCaseError } from '@/core/errors/use-case-error'

export class AgentNotFoundError extends Error implements UseCaseError {
	constructor() {
		super(`Agent not found.`)
	}
}
