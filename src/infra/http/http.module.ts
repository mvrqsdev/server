import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { ControllersModule } from './controllers/controllers.module'
import { FacadeModule } from './facades/facade.module'
import { GlobalHttpExceptionFilter } from './filters/http-exception.filter'

@Module({
	imports: [
		ControllersModule,
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
