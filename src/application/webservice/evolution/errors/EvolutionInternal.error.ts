import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class EvolutionInternalError extends DomainError {
	constructor() {
		super(ErrorCodes.WEBSERVICE.EVOLUTION.INTERNAL_ERROR, 500)
	}
}
