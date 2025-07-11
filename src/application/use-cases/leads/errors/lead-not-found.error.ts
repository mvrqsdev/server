import { ErrorCodes } from '@/core/errors/codes'
import { UseCaseError } from '@/core/errors/use-case-error'

export class LeadNotFoundError extends Error implements UseCaseError {
	constructor() {
		super(ErrorCodes.LEAD.NOT_FOUND)
	}
}
