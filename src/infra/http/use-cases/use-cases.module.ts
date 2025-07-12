import { Module } from '@nestjs/common'
import { RouletteService } from '@/application/services/roulette/roulette.service'
import { CreateAgentUseCase } from '@/application/use-cases/agents/create-agent.use-case'
import { GetAgentByIdUseCase } from '@/application/use-cases/agents/get-agent.use-case'
import { UpdateAgentUseCase } from '@/application/use-cases/agents/update-agent.use-case'
import { ValidateAgentByEmailAndPasswordUseCase } from '@/application/use-cases/agents/validate-agent-by-email-and-password.use-case'
import { CreateAuthenticationUseCase } from '@/application/use-cases/authentication/create-authentication.use-case'
import { RevokeAuthenticationByAuthenticationIdUseCase } from '@/application/use-cases/authentication/revole-authentication-by-authenticationId.use-case'
import { CreateCampaignUseCase } from '@/application/use-cases/campaign/create-campaign.use-case'
import { CreateConnectionUseCase } from '@/application/use-cases/connection/create-connection.use-case'
import { CreateLeadUseCase } from '@/application/use-cases/leads/create-lead.use-case'
import { GetLeadByIdUseCase } from '@/application/use-cases/leads/get-lead-by-id.use-case'
import { UpdateLeadUseCase } from '@/application/use-cases/leads/update-lead.use-case'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { EnvModule } from '@/infra/env/env.module'
import { WebServiceModule } from '@/infra/webservice/webservice.module'

@Module({
	imports: [EnvModule, DatabaseModule, WebServiceModule, CryptographyModule],
	providers: [
		RevokeAuthenticationByAuthenticationIdUseCase,
		ValidateAgentByEmailAndPasswordUseCase,
		CreateAuthenticationUseCase,
		CreateAgentUseCase,
		GetAgentByIdUseCase,
		UpdateAgentUseCase,
		GetLeadByIdUseCase,
		UpdateLeadUseCase,
		CreateLeadUseCase,
		CreateConnectionUseCase,
		CreateCampaignUseCase,
		RouletteService,
	],
	exports: [
		RevokeAuthenticationByAuthenticationIdUseCase,
		ValidateAgentByEmailAndPasswordUseCase,
		CreateAuthenticationUseCase,
		CreateAgentUseCase,
		GetAgentByIdUseCase,
		UpdateAgentUseCase,
		GetLeadByIdUseCase,
		UpdateLeadUseCase,
		CreateLeadUseCase,
		CreateConnectionUseCase,
		CreateCampaignUseCase,
		RouletteService,
	],
})
export class UseCasesModule {}
