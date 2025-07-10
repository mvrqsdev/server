import { UseCaseError } from '@/core/errors/use-case-error'

export class ConnectionNotFoundError extends Error implements UseCaseError {
	constructor(identifier: string) {
		super(`Connection's ${identifier} not found.`)
	}
}
