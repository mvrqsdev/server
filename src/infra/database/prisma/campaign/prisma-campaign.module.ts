import { forwardRef, Module } from '@nestjs/common'
import { CampaignRepository } from '@/application/repositories/campaign/campaign.repository'
import { FacadeModule } from '@/infra/http/facades/facade.module'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaCampaignRepository } from './repositories/prisma-campaign.repository'

@Module({
	imports: [PrismaCoreModule, forwardRef(() => FacadeModule)],
	providers: [
		{
			provide: CampaignRepository,
			useClass: PrismaCampaignRepository,
		},
	],
	exports: [CampaignRepository],
})
export class PrismaCampaignModule {}
