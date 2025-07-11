import { ErrorCodes } from '@/core/errors/codes'
import { UseCaseError } from '@/core/errors/use-case-error'

export class NoAgentInRouletteError extends Error implements UseCaseError {
	constructor() {
		super(ErrorCodes.ROULETTE.AGENT.NOT_FOUND)
	}
}
