import { Module } from '@nestjs/common'

import { PrismaModule } from '@/infra/database/prisma/prisma.module'
import { FacadeModule } from '../../facades/facade.module'
import { AgentController } from './agent.controller'

@Module({
	imports: [PrismaModule, FacadeModule],
	providers: [],
	controllers: [AgentController],
	exports: [],
})
export class AgentControllersModule {}
