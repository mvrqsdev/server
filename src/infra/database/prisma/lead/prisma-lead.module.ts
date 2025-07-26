import { Module } from '@nestjs/common'
import { LeadRepository } from '@/application/repositories/lead.repository'
import { CreateLeadUseCase } from '@/application/use-cases/lead/create-lead.use-case'
import { GetLeadStrategyFactory } from '@/application/use-cases/lead/factories/get-lead-strategy.factory'
import { FindLeadByIdUseCase } from '@/application/use-cases/lead/find-lead-by-id.use-case'
import { UpdateLeadUseCase } from '@/application/use-cases/lead/update-lead.use-case'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaSchedulingModule } from '../scheduling/prisma-scheduling.module'
import { PrismaLeadMapper } from './mappers/lead.prisma-mapper'
import { PrismaLeadRepository } from './repositories/prisma-lead.repository'

@Module({
	imports: [PrismaCoreModule, PrismaSchedulingModule],
	providers: [
		PrismaLeadMapper,
		{
			provide: LeadRepository,
			useClass: PrismaLeadRepository,
		},
		GetLeadStrategyFactory,
		CreateLeadUseCase,
		FindLeadByIdUseCase,
		UpdateLeadUseCase,
	],
	exports: [
		PrismaLeadMapper,
		LeadRepository,
		GetLeadStrategyFactory,
		CreateLeadUseCase,
		FindLeadByIdUseCase,
		UpdateLeadUseCase,
	],
})
export class PrismaLeadModule {}
