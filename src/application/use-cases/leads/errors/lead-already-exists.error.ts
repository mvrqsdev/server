import { ErrorCodes } from '@/core/errors/codes'
import { UseCaseError } from '@/core/errors/use-case-error'

export class LeadAlreadyExistsError extends Error implements UseCaseError {
	constructor() {
		super(ErrorCodes.LEAD.ALREADY_EXISTS)
	}
}
