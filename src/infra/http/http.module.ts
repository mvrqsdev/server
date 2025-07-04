import { Module } from '@nestjs/common'
import { CreateAgentUseCase } from '@/domain/real-state/application/use-cases/create-agent.use-case'
import { InactiveAgentUseCase } from '@/domain/real-state/application/use-cases/inactive-agent.use-case'
import { UpdateAgentUseCase } from '@/domain/real-state/application/use-cases/update-agent.use-case'
import { CreateRoleUseCase } from '@/domain/roles/application/use-cases/create-role.use-case'
import { DeleteRoleUseCase } from '@/domain/roles/application/use-cases/delete-role.use-case'
import { UpdateRoleUseCase } from '@/domain/roles/application/use-cases/update-role.use-case'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { CreateAgentController } from './controllers/create-agent.controller'
import { CreateRoleController } from './controllers/create-role.controller'
import { DeleteRoleController } from './controllers/delete-role.controller'
import { InactiveAgentController } from './controllers/inactive-agent.controller'
import { UpdateAgentController } from './controllers/update-agent.controller'
import { UpdateRoleController } from './controllers/update-role.controller'

@Module({
	imports: [DatabaseModule, CryptographyModule],
	controllers: [
		CreateAgentController,
		UpdateAgentController,
		InactiveAgentController,
		CreateRoleController,
		UpdateRoleController,
		DeleteRoleController,
	],
	providers: [
		CreateAgentUseCase,
		UpdateAgentUseCase,
		InactiveAgentUseCase,
		CreateRoleUseCase,
		UpdateRoleUseCase,
		DeleteRoleUseCase,
	],
})
export class HttpModule {}
