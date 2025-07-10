import { Module } from '@nestjs/common'
import { RouletteService } from '@/application/services/roulette/roulette.service'
import { CreateAgentUseCase } from '@/application/use-cases/agents/create-agent.use-case'
import { UpdateAgentUseCase } from '@/application/use-cases/agents/update-agent.use-case'
import { CreateAuthenticationUseCase } from '@/application/use-cases/authentication/create-authentication.use-case'
import { CreateConnectionUseCase } from '@/application/use-cases/connection/create-connection.use-case'
import { CreateLeadUseCase } from '@/application/use-cases/leads/create-lead.use-case'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { WebServiceModule } from '../webservice/webservice.module'
import { CreateAgentController } from './controllers/agent/create-agent.controller'
import { UpdateAgentController } from './controllers/agent/update-agent.controller'
import { CreateApiKeyController } from './controllers/authentication/create-api-key.controller'
import { CreateConnectionController } from './controllers/connection/create-connection.controller'
import { CreateLeadController } from './controllers/lead/create-lead.controller'

@Module({
	imports: [DatabaseModule, WebServiceModule, CryptographyModule],
	controllers: [
		CreateApiKeyController,
		CreateAgentController,
		UpdateAgentController,
		CreateLeadController,
		CreateConnectionController,
	],
	providers: [
		CreateAuthenticationUseCase,
		CreateAgentUseCase,
		UpdateAgentUseCase,
		CreateLeadUseCase,
		CreateConnectionUseCase,
		RouletteService,
	],
})
export class HttpModule {}
