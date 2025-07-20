import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { PrismaAgentModule } from '@/infra/database/prisma/agent/prisma-agent.module'
import { PrismaAuthenticationModule } from '@/infra/database/prisma/authentication/prisma-authentication.module'
import { PrismaModule } from '@/infra/database/prisma/prisma.module'
import { FacadeModule } from '@/infra/http/facades/facade.module'
import { CryptographyModule } from '../../cryptography/cryptography.module'
import { EnvModule } from '../../env/env.module'
import { AgentControllersModule } from '../../http/controllers/agent/agent-controllers.module'
import { AuthenticationControllersModule } from '../../http/controllers/authentication/authentication-controllers.module'
import { AuthenticationGuard } from './authentication.guard'

@Module({
	imports: [
		PrismaModule,
		PrismaAuthenticationModule,
		PrismaAgentModule,
		CryptographyModule,
		EnvModule,
		AgentControllersModule,
		AuthenticationControllersModule,
		FacadeModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthenticationGuard,
		},
	],
})
export class AuthenticationModule {}
