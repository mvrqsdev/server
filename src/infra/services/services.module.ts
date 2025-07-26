import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { EventsModule } from '../events/events.module'

@Module({
	imports: [EnvModule, EventsModule],
	providers: [],
	exports: [],
})
export class ServicesModule {}
