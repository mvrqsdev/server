import { Module } from '@nestjs/common'
import { CampaignRepository } from '@/application/repositories/campaign.repository'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaCampaignRepository } from './repositories/prisma-campaign.repository'

@Module({
	imports: [PrismaCoreModule],
	providers: [
		{
			provide: CampaignRepository,
			useClass: PrismaCampaignRepository,
		},
	],
	exports: [CampaignRepository],
})
export class PrismaCampaignModule {}
