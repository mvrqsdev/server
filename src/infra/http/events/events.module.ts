import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/infra/database/database.module'
import { AgentCreatedListener } from './listerners/create-user.listener'

@Module({
	imports: [DatabaseModule],
	providers: [AgentCreatedListener],
})
export class EventsModule {}
