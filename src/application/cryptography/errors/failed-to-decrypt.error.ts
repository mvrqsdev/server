import { UseCaseError } from '@/core/errors/use-case-error'

export class FailedToDecryptError extends Error implements UseCaseError {
	constructor() {
		super(`Failed to decrypt.`)
	}
}
