import { ErrorCodes } from '@/core/errors/codes'
import { UseCaseError } from '@/core/errors/use-case-error'

export class CampaignAlreadyExistsError extends Error implements UseCaseError {
	constructor() {
		super(ErrorCodes.CAMPAIGN.ALREADY_EXISTS)
	}
}
