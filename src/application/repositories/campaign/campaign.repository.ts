import { Campaign } from '@/domain/campaign/entities/campaign.entity'

export abstract class CampaignRepository {
	abstract findById(id: string): Promise<Campaign | null>
	abstract findByExternalId(externalId: string): Promise<Campaign | null>
	abstract create(campaign: Campaign): Promise<void>
	abstract save(campaign: Campaign): Promise<void>
}
