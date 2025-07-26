import { DomainError } from '@/core/errors/domain.error'

export class IAMessageNotFoundError extends DomainError {
	constructor() {
		super('IA_MESSAGE_NOT_FOUND_ERROR', 404)
	}
}
