import { UseCaseError } from '@/core/errors/use-case-error'
import { ErrorCodes } from '../codes'

export class ResourceNotFoundError extends Error implements UseCaseError {
	constructor() {
		super(ErrorCodes.DEFAULT.NOT_FOUND)
	}
}
