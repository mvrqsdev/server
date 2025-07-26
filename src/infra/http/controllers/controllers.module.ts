import { Module } from '@nestjs/common'
import { PrismaModule } from '@/infra/database/prisma/prisma.module'
import { EnvModule } from '@/infra/env/env.module'
import { FacadeModule } from '../facades/facade.module'
import { AgentController } from './agent/agent.controller'
import { InstanceController } from './instance/instance.controller'
import { RoleController } from './roles/role.controller'
import { TwilioController } from './twilio/twilio.controller'

@Module({
	imports: [PrismaModule, FacadeModule, EnvModule],
	controllers: [AgentController, InstanceController, RoleController, TwilioController],
})
export class ControllersModule {}
