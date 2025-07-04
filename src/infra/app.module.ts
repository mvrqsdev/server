import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { envSchema } from './env'
import { EventsModule } from './http/events/events.module'
import { HttpModule } from './http/http.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		EventEmitterModule.forRoot(),
		EventsModule,
		HttpModule,
	],
})
export class AppModule {}
