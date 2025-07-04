import { Module } from '@nestjs/common'
import { AgentRepository } from '@/domain/real-state/application/repositories/agent.repository'
import { PermissionRepository } from '@/domain/roles/application/repositories/permission.repository'
import { RoleRepository } from '@/domain/roles/application/repositories/role.repository'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAgentRepository } from './prisma/repositories/prisma-agent.repository'
import { PrismaPermissionRepository } from './prisma/repositories/prisma-permission.repository'
import { PrismaRoleRepository } from './prisma/repositories/prisma-role.repository'

@Module({
	providers: [
		PrismaService,
		{
			provide: RoleRepository,
			useClass: PrismaRoleRepository,
		},
		{
			provide: PermissionRepository,
			useClass: PrismaPermissionRepository,
		},
		{
			provide: AgentRepository,
			useClass: PrismaAgentRepository,
		},
	],
	exports: [PrismaService, RoleRepository, PermissionRepository, AgentRepository],
})
export class DatabaseModule {}
