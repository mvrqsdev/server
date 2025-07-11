import { UseCaseError } from '@/core/errors/use-case-error'
import { ErrorCodes } from '../codes'

export class NotAllowedError extends Error implements UseCaseError {
	constructor() {
		super(ErrorCodes.DEFAULT.NOT_ALLOWED)
	}
}
