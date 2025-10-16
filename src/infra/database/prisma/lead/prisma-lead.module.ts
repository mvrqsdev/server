import { Module } from '@nestjs/common'
import { LeadRepository } from '@/application/repositories/lead.repository'
import { CheckIfLastLeadFromContactIsActive } from '@/application/use-cases/lead/check-if-last-lead-from-contact-is-active.use-case'
import { CreateLeadUseCase } from '@/application/use-cases/lead/create-lead.use-case'
import { GetLeadStrategyFactory } from '@/application/use-cases/lead/factories/get-lead-strategy.factory'
import { FindLastLeadByContactIdUseCase } from '@/application/use-cases/lead/find-last-lead-by-contact-id.use-case'
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
		CheckIfLastLeadFromContactIsActive,
		CreateLeadUseCase,
		FindLastLeadByContactIdUseCase,
		FindLeadByIdUseCase,
		UpdateLeadUseCase,
	],
	exports: [
		PrismaLeadMapper,
		LeadRepository,
		GetLeadStrategyFactory,
		CheckIfLastLeadFromContactIsActive,
		CreateLeadUseCase,
		FindLastLeadByContactIdUseCase,
		FindLeadByIdUseCase,
		UpdateLeadUseCase,
	],
})
export class PrismaLeadModule {}
