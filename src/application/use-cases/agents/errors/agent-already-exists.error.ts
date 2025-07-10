import { UseCaseError } from '@/core/errors/use-case-error'

export class AgentAlreadyExistsError extends Error implements UseCaseError {
	constructor(identifier: string) {
		super(`Agent "${identifier}" already exists.`)
	}
}
