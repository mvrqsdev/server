import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { AgentControllersModule } from './controllers/agent/agent-controllers.module'
import { AuthenticationControllersModule } from './controllers/authentication/authentication-controllers.module'
import { CampaignControllersModule } from './controllers/campaign/campaign-controllers.module'
import { ConnectionControllersModule } from './controllers/connection/connection-controller.module'
import { LeadControllersModule } from './controllers/lead/lead-controller.module'
import { GlobalHttpExceptionFilter } from './filters/http-exception.filter'

@Module({
	imports: [
		AgentControllersModule,
		AuthenticationControllersModule,
		ConnectionControllersModule,
		LeadControllersModule,
		CampaignControllersModule,
	],
	providers: [
		{
			provide: APP_FILTER,
			useClass: GlobalHttpExceptionFilter,
		},
	],
})
export class HttpModule {}
