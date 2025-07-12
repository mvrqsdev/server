import { Module } from '@nestjs/common'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { WebServiceModule } from '@/infra/webservice/webservice.module'
import { UseCasesModule } from '../../use-cases/use-cases.module'
import { CreateAgentController } from './create-agent.controller'
import { GetAgentByIdController } from './get-agent-by-id.controller'
import { GetAgentProfileController } from './get-profile.controller'
import { UpdateAgentController } from './update-agent.controller'
import { UpdateAgentProfileController } from './update-profile.controller'

@Module({
	imports: [DatabaseModule, WebServiceModule, CryptographyModule, UseCasesModule],
	controllers: [
		CreateAgentController,
		GetAgentByIdController,
		GetAgentProfileController,
		UpdateAgentController,
		UpdateAgentProfileController,
	],
})
export class AgentControllersModule {}
