import { Prisma, Campaign as PrismaCampaign } from '@prisma/client'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Campaign } from '@/domain/campaign/entities/campaign.entity'

export class PrismaCampaignMapper {
	static toDomain(raw: PrismaCampaign): Campaign {
		return Campaign.create(
			{
				name: raw.name,
				externalId: raw.externalId,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}

	static toPrisma(campaign: Campaign): Prisma.CampaignUncheckedCreateInput {
		return {
			id: campaign.id.toString(),
			name: campaign.name,
			externalId: campaign.externalId,
			createdAt: campaign.createdAt,
			updatedAt: campaign.updatedAt,
		}
	}
}
