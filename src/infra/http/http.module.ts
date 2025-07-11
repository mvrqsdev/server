import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { RouletteService } from '@/application/services/roulette/roulette.service'
import { CreateAgentUseCase } from '@/application/use-cases/agents/create-agent.use-case'
import { UpdateAgentUseCase } from '@/application/use-cases/agents/update-agent.use-case'
import { CreateAuthenticationUseCase } from '@/application/use-cases/authentication/create-authentication.use-case'
import { CreateConnectionUseCase } from '@/application/use-cases/connection/create-connection.use-case'
import { CreateLeadUseCase } from '@/application/use-cases/leads/create-lead.use-case'
import { GetLeadByIdUseCase } from '@/application/use-cases/leads/get-lead-by-id.use-case'
import { UpdateLeadUseCase } from '@/application/use-cases/leads/update-lead.use-case'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { WebServiceModule } from '../webservice/webservice.module'
import { CreateAgentController } from './controllers/agent/create-agent.controller'
import { UpdateAgentController } from './controllers/agent/update-agent.controller'
import { UpdateAgentProfileController } from './controllers/agent/update-profile.controller'
import { CreateApiKeyController } from './controllers/authentication/create-api-key.controller'
import { CreateConnectionController } from './controllers/connection/create-connection.controller'
import { CreateLeadController } from './controllers/lead/create-lead.controller'
import { GetLeadByIdController } from './controllers/lead/get-lead-by-id.controller'
import { UpdateLeadController } from './controllers/lead/update-lead.controller'
import { DomainErrorFilter } from './filters/domain-error.filter'

@Module({
	imports: [DatabaseModule, WebServiceModule, CryptographyModule],
	controllers: [
		CreateApiKeyController,
		CreateAgentController,
		UpdateAgentController,
		UpdateAgentProfileController,
		GetLeadByIdController,
		UpdateLeadController,
		CreateLeadController,
		CreateConnectionController,
	],
	providers: [
		CreateAuthenticationUseCase,
		CreateAgentUseCase,
		UpdateAgentUseCase,
		GetLeadByIdUseCase,
		UpdateLeadUseCase,
		CreateLeadUseCase,
		CreateConnectionUseCase,
		RouletteService,
		{
			provide: APP_FILTER,
			useClass: DomainErrorFilter,
		},
	],
})
export class HttpModule {}
