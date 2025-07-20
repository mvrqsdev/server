import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './database/prisma/prisma.module'
import { envSchema } from './env/env'
import { EnvModule } from './env/env.module'
import { EventsModule } from './events/events.module'
import { AuthenticationModule } from './guards/authentication/authentication.module'
import { AuthorizationModule } from './guards/authorization/authorization.module'
import { HttpModule } from './http/http.module'
import { QueueModule } from './queues/queue.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		PrismaModule,
		AuthenticationModule,
		AuthorizationModule,
		HttpModule,
		EventsModule,
		EnvModule,
		QueueModule,
	],
})
export class AppModule {}
