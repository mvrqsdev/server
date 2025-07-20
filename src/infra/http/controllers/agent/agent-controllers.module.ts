import { Module } from '@nestjs/common'

import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { PrismaModule } from '@/infra/database/prisma/prisma.module'
import { WebServiceModule } from '@/infra/webservice/webservice.module'
import { AgentController } from './agent.controller'

@Module({
	imports: [PrismaModule, WebServiceModule, CryptographyModule],
	providers: [],
	controllers: [AgentController],
	exports: [],
})
export class AgentControllersModule {}
