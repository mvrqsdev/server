import { forwardRef, Module } from '@nestjs/common'
import { AgentFacade } from '@/application/facades/agent/agent.facade'
import { AuthenticationFacade } from '@/application/facades/authentication/authentication.facade'
import { TokenFacade } from '@/application/facades/token/token.facade'
import { PrismaModule } from '@/infra/database/prisma/prisma.module'
import { NestAgentFacade } from './agent.facade'
import { NestAuthenticationFacade } from './authentication.facade'
import { NestTokenFacade } from './token.facade'

@Module({
	imports: [forwardRef(() => PrismaModule)],
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
			provide: AgentFacade,
			useClass: NestAgentFacade,
		},
	],
	exports: [AgentFacade, TokenFacade, AuthenticationFacade],
})
export class FacadeModule {}
