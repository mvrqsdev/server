import { UseCaseError } from '@/core/errors/use-case-error'

export class LeadNotFoundError extends Error implements UseCaseError {
	constructor(identifier: string) {
		super(`Lead from "${identifier}" not found.`)
	}
}
