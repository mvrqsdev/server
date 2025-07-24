import { forwardRef, Module } from '@nestjs/common'
import { RoleRepository } from '@/application/repositories/role.repository'
import { CheckIfRoleDoesNotExistsUseCase } from '@/application/use-cases/role/check-if-role-does-not-exists.use-case'
import { CreateRoleUseCase } from '@/application/use-cases/role/create-role.use-case'
import { UpdateRoleUseCase } from '@/application/use-cases/role/update-role.use-case'

import { PrismaAgentModule } from '../agent/prisma-agent.module'
import { PrismaPermissionModule } from '../permission/prisma-permission.module'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaRoleMapper } from './mappers/role.prisma-mapper'
import { PrismaRoleRepository } from './repositories/prisma-role.repository'

@Module({
	imports: [
		PrismaCoreModule,
		forwardRef(() => PrismaAgentModule),
		PrismaPermissionModule,
	],
	providers: [
		PrismaRoleMapper,
		{
			provide: RoleRepository,
			useClass: PrismaRoleRepository,
		},
		CheckIfRoleDoesNotExistsUseCase,
		CreateRoleUseCase,
		UpdateRoleUseCase,
	],
	exports: [
		PrismaRoleMapper,
		RoleRepository,
		CheckIfRoleDoesNotExistsUseCase,
		CreateRoleUseCase,
		UpdateRoleUseCase,
	],
})
export class PrismaRoleModule {}
