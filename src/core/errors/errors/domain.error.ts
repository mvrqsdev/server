import { UseCaseError } from '@/core/errors/use-case-error'

export class DomainError extends Error implements UseCaseError {
	constructor(errorMessage: string) {
		super(`${errorMessage}`)
	}
}
