import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class CreateInstanceError extends DomainError {
	constructor() {
		super(ErrorCodes.EVOLUTION.CREATE_INSTANCE.INTERNAL_ERROR, 500)
	}
}
