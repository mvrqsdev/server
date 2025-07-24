import { Module } from '@nestjs/common'
import { SchedulingRepository } from '@/application/repositories/scheduling.repository'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaSchedulingRepository } from './repositories/prisma-scheduling.repository'

@Module({
	imports: [PrismaCoreModule],
	providers: [
		{
			provide: SchedulingRepository,
			useClass: PrismaSchedulingRepository,
		},
	],
	exports: [SchedulingRepository],
})
export class PrismaSchedulingModule {}
