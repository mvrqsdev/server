import { forwardRef, Module } from '@nestjs/common'
import { AgentFacade } from '@/application/facades/agent/agent.facade'
import { AuthenticationFacade } from '@/application/facades/authentication/authentication.facade'
import { RoleFacade } from '@/application/facades/roles/role.facade'
import { TokenFacade } from '@/application/facades/token/token.facade'
import { PrismaModule } from '@/infra/database/prisma/prisma.module'
import { QueueModule } from '@/infra/queues/queue.module'
import { NestAgentFacade } from './nest-agent.facade'
import { NestAuthenticationFacade } from './nest-authentication.facade'
import { NestRoleFacade } from './nest-role.facade'
import { NestTokenFacade } from './nest-token.facade'

@Module({
	imports: [forwardRef(() => PrismaModule), forwardRef(() => QueueModule)],
	providers: [
		{
			provide: AuthenticationFacade,
			useClass: NestAuthenticationFacade,
		},
		{
			provide: TokenFacade,
			useClass: NestTokenFacade,
		},
		{
			provide: RoleFacade,
			useClass: NestRoleFacade,
		},
		{
			provide: AgentFacade,
			useClass: NestAgentFacade,
		},
	],
	exports: [AgentFacade, TokenFacade, AuthenticationFacade, RoleFacade],
})
export class FacadeModule {}
