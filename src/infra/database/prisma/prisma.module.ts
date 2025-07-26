import { Module } from '@nestjs/common'

import { PrismaAgentModule } from './agent/prisma-agent.module'
import { PrismaAuthenticationModule } from './authentication/prisma-authentication.module'
import { PrismaCampaignModule } from './campaign/prisma-campaign.module'
import { PrismaContactModule } from './contact/prisma-contact.module'
import { PrismaAIModule } from './ia-message/prisma-ia-message.module'
import { PrismaInstanceModule } from './instance/prisma-instance.module'
import { PrismaLeadModule } from './lead/prisma-lead.module'
import { PrismaPermissionModule } from './permission/prisma-permission.module'
import { PrismaService } from './prisma.service'
import { PrismaRoleModule } from './role/prisma-role.module'
import { PrismaSchedulingModule } from './scheduling/prisma-scheduling.module'
import { PrismaTokenModule } from './token/prisma-token.module'

@Module({
	imports: [
		PrismaAgentModule,
		PrismaAuthenticationModule,
		PrismaCampaignModule,
		PrismaContactModule,
		PrismaAIModule,
		PrismaInstanceModule,
		PrismaLeadModule,
		PrismaPermissionModule,
		PrismaRoleModule,
		PrismaSchedulingModule,
		PrismaTokenModule,
	],
	providers: [PrismaService],
	exports: [
		PrismaService,
		PrismaAgentModule,
		PrismaAuthenticationModule,
		PrismaCampaignModule,
		PrismaContactModule,
		PrismaAIModule,
		PrismaInstanceModule,
		PrismaPermissionModule,
		PrismaLeadModule,
		PrismaRoleModule,
		PrismaSchedulingModule,
		PrismaTokenModule,
	],
})
export class PrismaModule {}
