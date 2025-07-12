import { ErrorCodes } from '@/core/errors/codes'
import { UseCaseError } from '@/core/errors/use-case-error'

export class ConnectionPrincipalNotFoundError extends Error implements UseCaseError {
	constructor() {
		super(ErrorCodes.CONNECTION.PRINCIPAL.NOT_FOUND)
	}
}
