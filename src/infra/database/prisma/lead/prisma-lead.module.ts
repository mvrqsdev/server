import { forwardRef, Module } from '@nestjs/common'
import { LeadRepository } from '@/application/repositories/lead/lead.repository'
import { FacadeModule } from '@/infra/http/facades/facade.module'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaSchedulingModule } from '../scheduling/prisma-scheduling.module'
import { PrismaLeadRepository } from './repositories/prisma-lead.repository'

@Module({
	imports: [PrismaCoreModule, PrismaSchedulingModule, forwardRef(() => FacadeModule)],
	providers: [
		{
			provide: LeadRepository,
			useClass: PrismaLeadRepository,
		},
	],
	exports: [LeadRepository],
})
export class PrismaLeadModule {}
