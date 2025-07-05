import { UseCaseError } from '@/core/errors/use-case-error'

export class NoAgentInRouletteError extends Error implements UseCaseError {
	constructor() {
		super(`No Agent at the roulette.`)
	}
}
