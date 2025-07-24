import { Campaign } from '@/domain/campaign/entities/campaign.entity'

export abstract class CampaignRepository {
	abstract create(campaign: Campaign): Promise<void>
	abstract save(campaign: Campaign): Promise<void>
}
