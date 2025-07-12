import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { AgentControllersModule } from './controllers/agent/agent-controllers.module'
import { AuthenticationControllersModule } from './controllers/authentication/authentication-controllers.module'
import { ConnectionControllersModule } from './controllers/connection/connection-controller.module'
import { LeadControllersModule } from './controllers/lead/lead-controller.module'
import { DomainErrorFilter } from './filters/domain-error.filter'

@Module({
	imports: [
		AgentControllersModule,
		AuthenticationControllersModule,
		ConnectionControllersModule,
		LeadControllersModule,
	],
	providers: [
		{
			provide: APP_FILTER,
			useClass: DomainErrorFilter,
		},
	],
})
export class HttpModule {}
