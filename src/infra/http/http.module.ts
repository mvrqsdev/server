import { Module } from '@nestjs/common'
import { RouleteService } from '@/domain/real-state/application/services/roulette.service'
import { CreateAgentUseCase } from '@/domain/real-state/application/use-cases/create-agent.use-case'
import { CreateAuthenticationUseCase } from '@/domain/real-state/application/use-cases/create-authentication.use-case'
import { CreateConnectionUseCase } from '@/domain/real-state/application/use-cases/create-connection.use-case'
import { CreateLeadUseCase } from '@/domain/real-state/application/use-cases/create-lead.use-case'
import { UpdateAgentUseCase } from '@/domain/real-state/application/use-cases/update-agent.use-case'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { IntegrationModule } from '../integration/integration.module'
import { CreateAgentController } from './controllers/create-agent.controller'
import { CreateApiKeyController } from './controllers/create-api-key.controller'
import { CreateConnectionController } from './controllers/create-connection.controller'
import { CreateLeadController } from './controllers/create-lead.controller'
import { TesteController } from './controllers/teste.controller'
import { UpdateAgentController } from './controllers/update-agent.controller'

@Module({
	imports: [DatabaseModule, IntegrationModule, CryptographyModule],
	controllers: [
		TesteController,
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
		RouleteService,
	],
})
export class HttpModule {}
