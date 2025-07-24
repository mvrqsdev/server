import { Module } from '@nestjs/common'
import { PrismaModule } from '@/infra/database/prisma/prisma.module'
import { FacadeModule } from '../facades/facade.module'
import { AgentController } from './agent/agent.controller'
import { RoleController } from './roles/role.controller'

@Module({
	imports: [PrismaModule, FacadeModule],
	controllers: [AgentController, RoleController],
})
export class ControllersModule {}
