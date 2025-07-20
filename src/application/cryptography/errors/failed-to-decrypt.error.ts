import { ErrorCodes } from '@/core/errors/codes'

export class FailedToDecryptError extends Error {
	constructor() {
		super(ErrorCodes.CRYPTOGRAPHY.DEFAULT)
	}
}
