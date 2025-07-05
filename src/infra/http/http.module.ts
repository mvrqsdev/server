import { Module } from '@nestjs/common'
import { RouleteService } from '@/domain/real-state/application/services/roulette.service'
import { CreateAgentUseCase } from '@/domain/real-state/application/use-cases/create-agent.use-case'
import { CreateConnectionUseCase } from '@/domain/real-state/application/use-cases/create-connection.use-case'
import { CreateLeadUseCase } from '@/domain/real-state/application/use-cases/create-lead.use-case'
import { UpdateAgentUseCase } from '@/domain/real-state/application/use-cases/update-agent.use-case'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { IntegrationModule } from '../integration/integration.module'
import { CreateAgentController } from './controllers/create-agent.controller'
import { CreateConnectionController } from './controllers/create-connection.controller'
import { CreateLeadController } from './controllers/create-lead.controller'
import { UpdateAgentController } from './controllers/update-agent.controller'

@Module({
	imports: [DatabaseModule, IntegrationModule, CryptographyModule],
	controllers: [
		CreateAgentController,
		UpdateAgentController,
		CreateLeadController,
		CreateConnectionController,
	],
	providers: [
		CreateAgentUseCase,
		UpdateAgentUseCase,
		CreateLeadUseCase,
		CreateConnectionUseCase,
		RouleteService,
	],
})
export class HttpModule {}
