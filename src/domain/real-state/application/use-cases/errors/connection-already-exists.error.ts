import { UseCaseError } from '@/core/errors/use-case-error'

export class ConnectionAlreadyExistsError extends Error implements UseCaseError {
	constructor(identifier: string) {
		super(`${identifier}'s connection already exists.`)
	}
}
