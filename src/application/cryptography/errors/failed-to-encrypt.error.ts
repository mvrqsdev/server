import { ErrorCodes } from '@/core/errors/codes'
import { UseCaseError } from '@/core/errors/use-case-error'

export class FailedToEncryptError extends Error implements UseCaseError {
	constructor() {
		super(ErrorCodes.CRYPTOGRAPHY.DEFAULT)
	}
}
