import { Injectable } from '@nestjs/common'
import { CampaignRepository } from '@/application/repositories/campaign/campaign.repository'
import { Either, left, right } from '@/core/either'
import { Campaign } from '@/domain/campaign/entities/campaign.entity'
import { CampaignAlreadyExistsError } from './errors/campaign-already-exists.error'

export interface CreateCampaignUseCaseRequest {
	name: string
	externalId: string
}

type CreateCampaignUseCaseResponse = Either<
	CampaignAlreadyExistsError,
	{ campaign: Campaign }
>

@Injectable()
export class CreateCampaignUseCase {
	constructor(private campaignRepository: CampaignRepository) {}

	async execute({
		name,
		externalId,
	}: CreateCampaignUseCaseRequest): Promise<CreateCampaignUseCaseResponse> {
		const campaignWithSameExternalId =
			await this.campaignRepository.findByExternalId(externalId)

		if (campaignWithSameExternalId) {
			return left(new CampaignAlreadyExistsError())
		}

		const campaign = Campaign.create({
			name,
			externalId,
		})

		await this.campaignRepository.create(campaign)
		return right({ campaign })
	}
}
