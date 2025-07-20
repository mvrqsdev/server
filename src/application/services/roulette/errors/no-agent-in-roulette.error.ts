import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/domain.error'

export class NoAgentInRouletteError extends DomainError {
	constructor() {
		super(ErrorCodes.ROULETTE.AGENT.NOT_FOUND, 404)
	}
}
