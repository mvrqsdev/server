import { UseCaseError } from '@/core/errors/use-case-error'

export class EvolutionInternalError extends Error implements UseCaseError {
	constructor() {
		super(`Evolution internal error.`)
	}
}
