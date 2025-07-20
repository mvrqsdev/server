import { Module } from '@nestjs/common'
import { OnInvitedAgent } from '@/application/subscribers/on-invited-agent'
import { PrismaModule } from '../database/prisma/prisma.module'
import { FacadeModule } from '../http/facades/facade.module'

@Module({
	imports: [PrismaModule, FacadeModule],
	providers: [OnInvitedAgent],
})
export class EventsModule {}
