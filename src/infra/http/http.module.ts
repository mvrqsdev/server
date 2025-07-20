import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { AgentControllersModule } from './controllers/agent/agent-controllers.module'
import { RoleControllersModule } from './controllers/roles/role-controllers.module'
import { FacadeModule } from './facades/facade.module'
import { GlobalHttpExceptionFilter } from './filters/http-exception.filter'

@Module({
	imports: [
		AgentControllersModule,
		RoleControllersModule,
		// AuthenticationControllersModule,
		// ConnectionControllersModule,
		// LeadControllersModule,
		// CampaignControllersModule,
		// SchedulingControllersModule,
		FacadeModule,
	],
	providers: [
		{
			provide: APP_FILTER,
			useClass: GlobalHttpExceptionFilter,
		},
	],
})
export class HttpModule {}
