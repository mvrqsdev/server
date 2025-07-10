import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthenticationModule } from './authentication/authentication.module'
import { envSchema } from './env/env'
import { EnvModule } from './env/env.module'
import { HttpModule } from './http/http.module'
import { QueueModule } from './queues/queue.module'
import { RouletteQueueModule } from './queues/roulette/roulette-queue.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		AuthenticationModule,
		HttpModule,
		EnvModule,
		QueueModule,
	],
})
export class AppModule {}
