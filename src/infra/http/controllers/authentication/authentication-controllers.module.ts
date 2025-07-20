import { Module } from '@nestjs/common'

import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { PrismaModule } from '@/infra/database/prisma/prisma.module'
import { EnvModule } from '@/infra/env/env.module'
import { WebServiceModule } from '@/infra/webservice/webservice.module'
import { CacheModule } from '../../cache/cache.module'
import { AgentControllersModule } from '../agent/agent-controllers.module'
import { AuthenticationController } from './authentication.controller'

@Module({
	imports: [
		PrismaModule,
		CacheModule,
		WebServiceModule,
		CryptographyModule,
		EnvModule,
		AgentControllersModule,
	],
	controllers: [AuthenticationController],
})
export class AuthenticationControllersModule {}
