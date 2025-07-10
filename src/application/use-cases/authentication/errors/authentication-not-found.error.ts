import { UseCaseError } from '@/core/errors/use-case-error'

export class AuthenticationNotFoundError extends Error implements UseCaseError {
	constructor() {
		super(`This authentication strategy was not found.`)
	}
}
