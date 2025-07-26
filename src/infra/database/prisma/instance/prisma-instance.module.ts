import { Module } from '@nestjs/common'
import { InstanceRepository } from '@/application/repositories/instance.repository'
import { CreateInstanceUseCase } from '@/application/use-cases/instance/create-instance.use-case'
import { GetInstanceStrategyFactory } from '@/application/use-cases/instance/factories/get-instance-strategy.factory'
import { GetManyInstanceStrategyFactory } from '@/application/use-cases/instance/factories/get-many-instances-strategy.factory'
import { FindInstanceByIdUseCase } from '@/application/use-cases/instance/find-instance-by-id.use-case'
import { FindManyInstancesByFiltersUseCase } from '@/application/use-cases/instance/find-many-instances-by-filters.use-case'
import { UpdateInstanceUseCase } from '@/application/use-cases/instance/update-instance.use-case'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaInstanceMapper } from './mappers/instance.prisma-mapper'
import { PrismaInstanceRepository } from './repositories/prisma-instance.repository'

@Module({
	imports: [PrismaCoreModule],
	providers: [
		PrismaInstanceMapper,
		GetInstanceStrategyFactory,
		GetManyInstanceStrategyFactory,
		{
			provide: InstanceRepository,
			useClass: PrismaInstanceRepository,
		},
		CreateInstanceUseCase,
		FindInstanceByIdUseCase,
		FindManyInstancesByFiltersUseCase,
		UpdateInstanceUseCase,
	],
	exports: [
		PrismaInstanceMapper,
		GetInstanceStrategyFactory,
		GetManyInstanceStrategyFactory,
		InstanceRepository,
		CreateInstanceUseCase,
		FindInstanceByIdUseCase,
		FindManyInstancesByFiltersUseCase,
		UpdateInstanceUseCase,
	],
})
export class PrismaInstanceModule {}
