import { Module } from '@nestjs/common'
import { PrismaModule } from '@/infra/database/prisma/prisma.module'
import { FacadeModule } from '../../facades/facade.module'
import { RoleController } from './role.controller'

@Module({
	imports: [PrismaModule, FacadeModule],
	controllers: [RoleController],
})
export class RoleControllersModule {}
