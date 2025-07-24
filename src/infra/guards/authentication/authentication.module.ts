import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { PrismaAgentModule } from '@/infra/database/prisma/agent/prisma-agent.module'
import { PrismaAuthenticationModule } from '@/infra/database/prisma/authentication/prisma-authentication.module'
import { PrismaModule } from '@/infra/database/prisma/prisma.module'
import { FacadeModule } from '@/infra/http/facades/facade.module'
import { CryptographyModule } from '../../cryptography/cryptography.module'
import { EnvModule } from '../../env/env.module'

import { AuthenticationGuard } from './authentication.guard'

@Module({
	imports: [
		PrismaModule,
		PrismaAuthenticationModule,
		PrismaAgentModule,
		CryptographyModule,
		EnvModule,
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
