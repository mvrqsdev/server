import { ErrorCodes } from '@/core/errors/codes'
import { UseCaseError } from '@/core/errors/use-case-error'

export class EvolutionInternalError extends Error implements UseCaseError {
	constructor() {
		super(ErrorCodes.WEBSERVICE.EVOLUTION.INTERNAL_ERROR)
	}
}
