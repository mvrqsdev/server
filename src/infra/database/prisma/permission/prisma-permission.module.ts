import { Module } from '@nestjs/common'
import { PermissionRepository } from '@/application/repositories/permission/permission.repository'
import { EnvModule } from '@/infra/env/env.module'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaPermissionMapper } from './mappers/permission.prisma-mapper'
import { PrismaPermissionRepository } from './repositories/prisma-permission.repository'

@Module({
	imports: [PrismaCoreModule, EnvModule],
	providers: [
		PrismaPermissionMapper,
		{
			provide: PermissionRepository,
			useClass: PrismaPermissionRepository,
		},
	],
	exports: [PrismaPermissionMapper, PermissionRepository],
})
export class PrismaPermissionModule {}
