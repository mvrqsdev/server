import { forwardRef, Module } from '@nestjs/common'

import { AgentRepository } from '@/application/repositories/agent/agent.repository'
import { AgentStatusFactory } from '@/application/repositories/agent/factories/agent-status.factory'
import { Active } from '@/application/repositories/agent/states/active-agent-status'
import { Inactive } from '@/application/repositories/agent/states/inactive-agent-status'
import { Invited } from '@/application/repositories/agent/states/invited-agent-status'
import { CheckAgentIsActiveUseCase } from '@/application/use-cases/agent/check-agent-is-active.use-case'
import { CheckIfAgentHasPermissionsUseCase } from '@/application/use-cases/agent/check-if-agent-has-permissions.use-case'
import { CheckIfThereNoAgentWithThisEmailUseCase } from '@/application/use-cases/agent/check-if-there-no-agent-with-this-email.use-case'
import { CreateAgentUseCase } from '@/application/use-cases/agent/create-agent.use-case'
import { FindAgentByAuthenticationUseCase } from '@/application/use-cases/agent/find-agent-by-authentication.use-case'
import { FindAgentByEmailUseCase } from '@/application/use-cases/agent/find-agent-by-email.use-case'
import { FindAgentByIdUseCase } from '@/application/use-cases/agent/find-agent-by-id.use-case'
import { GetManyAgentsByFilterUseCase } from '@/application/use-cases/agent/get-many-agents-by-filters.use-case'
import { UpdateAgentUseCase } from '@/application/use-cases/agent/update-agent.use-case'
import { ValidateAgentEmailAndPasswordUseCase } from '@/application/use-cases/agent/validate-agent-email-and-password.use-case'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { EnvModule } from '@/infra/env/env.module'
import { PrismaAgentStatusFactory } from '@/infra/factories/agent-status/prisma-agent-status.factory'
import { FacadeModule } from '@/infra/http/facades/facade.module'
import { PrismaConnectionModule } from '../connection/prisma-connection.module'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaRoleModule } from '../role/prisma-role.module'
import { PrismaAgentMapper } from './mappers/agent.prisma-mapper'
import { PrismaAgentDetailsMapper } from './mappers/agent-details.prisma-mapper'
import { PrismaAgentRepository } from './repositories/prisma-agent.repository'

@Module({
	imports: [
		PrismaCoreModule,
		PrismaRoleModule,
		CryptographyModule,
		EnvModule,
		forwardRef(() => PrismaRoleModule),
		forwardRef(() => PrismaConnectionModule),
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
		{
			provide: AgentStatusFactory,
			useClass: PrismaAgentStatusFactory,
		},
		{
			provide: AgentRepository,
			useClass: PrismaAgentRepository,
		},

		/**
		 *  Use Cases
		 **/
		CheckAgentIsActiveUseCase,
		CheckIfAgentHasPermissionsUseCase,
		CheckIfThereNoAgentWithThisEmailUseCase,
		CreateAgentUseCase,
		FindAgentByAuthenticationUseCase,
		FindAgentByEmailUseCase,
		FindAgentByIdUseCase,
		GetManyAgentsByFilterUseCase,
		UpdateAgentUseCase,
		ValidateAgentEmailAndPasswordUseCase,
	],
	exports: [
		PrismaAgentMapper,
		PrismaAgentDetailsMapper,

		'AgentStatusActive',
		'AgentStatusInactive',
		'AgentStatusInvited',
		AgentStatusFactory,
		AgentRepository,

		/**
		 * UseCases
		 **/
		CheckAgentIsActiveUseCase,
		CheckIfAgentHasPermissionsUseCase,
		CheckIfThereNoAgentWithThisEmailUseCase,
		CreateAgentUseCase,
		FindAgentByAuthenticationUseCase,
		FindAgentByEmailUseCase,
		FindAgentByIdUseCase,
		GetManyAgentsByFilterUseCase,
		UpdateAgentUseCase,
		ValidateAgentEmailAndPasswordUseCase,
	],
})
export class PrismaAgentModule {}
