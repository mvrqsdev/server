import { Module } from '@nestjs/common'
import { OnAlterAgentEmail } from '@/application/subscribers/on-alter-agent-email'
import { OnAlterAgentStatus } from '@/application/subscribers/on-alter-agent-status'
import { OnCreatedAgent } from '@/application/subscribers/on-created-agent'
import { OnCreatedToken } from '@/application/subscribers/on-created-token'
import { PrismaModule } from '../database/prisma/prisma.module'
import { FacadeModule } from '../http/facades/facade.module'

@Module({
	imports: [PrismaModule, FacadeModule],
	providers: [OnAlterAgentEmail, OnAlterAgentStatus, OnCreatedAgent, OnCreatedToken],
})
export class EventsModule {}
