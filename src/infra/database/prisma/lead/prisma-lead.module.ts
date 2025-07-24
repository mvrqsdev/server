import { Module } from '@nestjs/common'
import { LeadRepository } from '@/application/repositories/lead.repository'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaSchedulingModule } from '../scheduling/prisma-scheduling.module'
import { PrismaLeadRepository } from './repositories/prisma-lead.repository'

@Module({
	imports: [PrismaCoreModule, PrismaSchedulingModule],
	providers: [
		{
			provide: LeadRepository,
			useClass: PrismaLeadRepository,
		},
	],
	exports: [LeadRepository],
})
export class PrismaLeadModule {}
