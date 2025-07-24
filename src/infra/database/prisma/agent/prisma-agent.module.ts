import { forwardRef, Module } from '@nestjs/common'

import { AgentRepository } from '@/application/repositories/agent.repository'

import { CheckAgentIsActiveUseCase } from '@/application/use-cases/agent/check-agent-is-active.use-case'
import { CheckAgentPasswordUseCase } from '@/application/use-cases/agent/check-agent-password.use-case'
import { CheckIfAgentHasPermissionsUseCase } from '@/application/use-cases/agent/check-if-agent-has-permissions.use-case'
import { CheckIfThereNoAgentWithThisEmailUseCase } from '@/application/use-cases/agent/check-if-there-no-agent-with-this-email.use-case'
import { CreateAgentUseCase } from '@/application/use-cases/agent/create-agent.use-case'
import { GetAgentStrategyFactory } from '@/application/use-cases/agent/factories/get-agent-strategy.factory'
import { GetManyAgentsStrategyFactory } from '@/application/use-cases/agent/factories/get-many-agents-strategy.factory'
import { GetValidateAgentStrategyFactory } from '@/application/use-cases/agent/factories/get-validate-agent-strategy.factory'
import { FindAgentByAuthenticationUseCase } from '@/application/use-cases/agent/find-agent-by-authentication.use-case'
import { FindAgentByEmailUseCase } from '@/application/use-cases/agent/find-agent-by-email.use-case'
import { FindAgentByIdUseCase } from '@/application/use-cases/agent/find-agent-by-id.use-case'
import { GetManyAgentsByFilterUseCase } from '@/application/use-cases/agent/get-many-agents-by-filters.use-case'
import { UpdateAgentUseCase } from '@/application/use-cases/agent/update-agent.use-case'
import { AgentStatusFactory } from '@/domain/agent/factories/agent-status.factory'
import { Active } from '@/domain/agent/states/active-agent-status'
import { Inactive } from '@/domain/agent/states/inactive-agent-status'
import { Invited } from '@/domain/agent/states/invited-agent-status'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { FacadeModule } from '@/infra/http/facades/facade.module'
import { PrismaConnectionModule } from '../connection/prisma-connection.module'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaRoleModule } from '../role/prisma-role.module'
import { PrismaAgentMapper } from './mappers/agent.prisma-mapper'
import { PrismaAgentDetailsMapper } from './mappers/agent-details.prisma-mapper'
import { PrismaAgentRepository } from './repositories/prisma-agent.repository'

@Module({
	imports: [
		CryptographyModule,
		PrismaCoreModule,
		PrismaConnectionModule,
		forwardRef(() => PrismaRoleModule),
		forwardRef(() => FacadeModule),
	],
	providers: [
		PrismaAgentMapper,
		PrismaAgentDetailsMapper,
		{
			provide: 'AgentStatusActive',
			useClass: Active,
		},
		{
			provide: 'AgentStatusInactive',
			useClass: Inactive,
		},
		{
			provide: 'AgentStatusInvited',
			useClass: Invited,
		},
		GetAgentStrategyFactory,
		GetManyAgentsStrategyFactory,
		GetValidateAgentStrategyFactory,
		AgentStatusFactory,
		{
			provide: AgentRepository,
			useClass: PrismaAgentRepository,
		},
		CheckAgentIsActiveUseCase,
		CheckAgentPasswordUseCase,
		CheckIfAgentHasPermissionsUseCase,
		CheckIfThereNoAgentWithThisEmailUseCase,
		CreateAgentUseCase,
		FindAgentByAuthenticationUseCase,
		FindAgentByEmailUseCase,
		FindAgentByIdUseCase,
		GetManyAgentsByFilterUseCase,
		UpdateAgentUseCase,
	],
	exports: [
		PrismaAgentMapper,
		PrismaAgentDetailsMapper,
		'AgentStatusActive',
		'AgentStatusInactive',
		'AgentStatusInvited',
		GetAgentStrategyFactory,
		GetManyAgentsStrategyFactory,
		GetValidateAgentStrategyFactory,
		AgentStatusFactory,
		AgentRepository,
		CheckAgentIsActiveUseCase,
		CheckIfAgentHasPermissionsUseCase,
		CheckIfThereNoAgentWithThisEmailUseCase,
		CreateAgentUseCase,
		FindAgentByAuthenticationUseCase,
		FindAgentByEmailUseCase,
		FindAgentByIdUseCase,
		GetManyAgentsByFilterUseCase,
		UpdateAgentUseCase,
		CheckAgentPasswordUseCase,
	],
})
export class PrismaAgentModule {}
