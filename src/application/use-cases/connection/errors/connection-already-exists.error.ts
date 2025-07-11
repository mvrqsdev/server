import { ErrorCodes } from '@/core/errors/codes'
import { UseCaseError } from '@/core/errors/use-case-error'

export class ConnectionAlreadyExistsError extends Error implements UseCaseError {
	constructor() {
		super(ErrorCodes.CONNECTION.ALREADY_EXISTS)
	}
}
