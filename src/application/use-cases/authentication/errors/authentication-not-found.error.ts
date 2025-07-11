import { ErrorCodes } from '@/core/errors/codes'
import { UseCaseError } from '@/core/errors/use-case-error'

export class AuthenticationNotFoundError extends Error implements UseCaseError {
	constructor() {
		super(ErrorCodes.AUTHENTICATION.STRATEGY_NOT_FOUND)
	}
}
