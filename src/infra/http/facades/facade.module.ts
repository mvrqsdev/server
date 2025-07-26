import { forwardRef, Module } from '@nestjs/common'
import { AgentFacade } from '@/application/facades/agent/agent.facade'
import { AuthenticationFacade } from '@/application/facades/authentication/authentication.facade'
import { ContactFacade } from '@/application/facades/contact/contact.facade'
import { IAMessageFacade } from '@/application/facades/ia-message/ia-message.facade'
import { InstanceFacade } from '@/application/facades/instance/instance.facade'
import { LeadFacade } from '@/application/facades/lead/lead.facade'
import { RoleFacade } from '@/application/facades/roles/role.facade'
import { TokenFacade } from '@/application/facades/token/token.facade'
import { PrismaModule } from '@/infra/database/prisma/prisma.module'
import { QueueModule } from '@/infra/queues/queue.module'
import { NestAgentFacade } from './nest-agent.facade'
import { NestAuthenticationFacade } from './nest-authentication.facade'
import { NestContactFacade } from './nest-contact.facade'
import { NestIAMessageFacade } from './nest-ia-message.facade'
import { NestInstanceFacade } from './nest-instance.facade'
import { NestLeadFacade } from './nest-lead.facade'
import { NestRoleFacade } from './nest-role.facade'
import { NestTokenFacade } from './nest-token.facade'

@Module({
	imports: [forwardRef(() => PrismaModule), forwardRef(() => QueueModule)],
	providers: [
		{
			provide: AgentFacade,
			useClass: NestAgentFacade,
		},
		{
			provide: AuthenticationFacade,
			useClass: NestAuthenticationFacade,
		},
		{
			provide: ContactFacade,
			useClass: NestContactFacade,
		},
		{
			provide: IAMessageFacade,
			useClass: NestIAMessageFacade,
		},
		{
			provide: InstanceFacade,
			useClass: NestInstanceFacade,
		},
		{
			provide: LeadFacade,
			useClass: NestLeadFacade,
		},
		{
			provide: RoleFacade,
			useClass: NestRoleFacade,
		},
		{
			provide: TokenFacade,
			useClass: NestTokenFacade,
		},
	],
	exports: [
		AgentFacade,
		AuthenticationFacade,
		ContactFacade,
		IAMessageFacade,
		InstanceFacade,
		LeadFacade,
		RoleFacade,
		TokenFacade,
	],
})
export class FacadeModule {}
