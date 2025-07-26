import { Module } from '@nestjs/common'
import { ChannelStartupService } from '@/application/services/whatsapp/channel-startup.service'
import { WAMonitoringService } from '@/application/services/whatsapp/wa-monitoring.service'
import { OnAlterAgentEmail } from '@/application/subscribers/on-alter-agent-email'
import { OnAlterAgentStatus } from '@/application/subscribers/on-alter-agent-status'
import { OnCreatedAgent } from '@/application/subscribers/on-created-agent'
import { OnCreatedToken } from '@/application/subscribers/on-created-token'
import { PrismaModule } from '../database/prisma/prisma.module'
import { FacadeModule } from '../http/facades/facade.module'
import { WAConnectionInitializer } from './wa-connection-initializer.service'

@Module({
	imports: [PrismaModule, FacadeModule],
	providers: [
		OnAlterAgentEmail,
		OnAlterAgentStatus,
		OnCreatedAgent,
		OnCreatedToken,
		WAMonitoringService,
		WAConnectionInitializer,
		ChannelStartupService,
	],
})
export class EventsModule {}
