import { Module } from '@nestjs/common'

import { PrismaAgentModule } from './agent/prisma-agent.module'
import { PrismaAuthenticationModule } from './authentication/prisma-authentication.module'
import { PrismaCampaignModule } from './campaign/prisma-campaign.module'
import { PrismaConnectionModule } from './connection/prisma-connection.module'
import { PrismaContactModule } from './contact/prisma-contact.module'
import { PrismaLeadModule } from './lead/prisma-lead.module'
import { PrismaService } from './prisma.service'
import { PrismaSchedulingModule } from './scheduling/prisma-scheduling.module'

@Module({
	imports: [
		PrismaAgentModule,
		PrismaAuthenticationModule,
		PrismaCampaignModule,
		PrismaConnectionModule,
		PrismaContactModule,
		PrismaLeadModule,
		PrismaSchedulingModule,
	],
	providers: [PrismaService],
	exports: [
		PrismaService,
		PrismaAgentModule,
		PrismaAuthenticationModule,
		PrismaCampaignModule,
		PrismaConnectionModule,
		PrismaContactModule,
		PrismaLeadModule,
		PrismaSchedulingModule,
	],
})
export class PrismaModule {}
