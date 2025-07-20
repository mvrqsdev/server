import { ErrorCodes } from '@/core/errors/codes'

export class FailedToEncryptError extends Error {
	constructor() {
		super(ErrorCodes.CRYPTOGRAPHY.DEFAULT)
	}
}
