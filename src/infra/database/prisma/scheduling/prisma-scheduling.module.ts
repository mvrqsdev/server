import { forwardRef, Module } from '@nestjs/common'
import { SchedulingRepository } from '@/application/repositories/scheduling/scheduling.repository'
import { FacadeModule } from '@/infra/http/facades/facade.module'
import { PrismaCoreModule } from '../prisma-core.module'
import { PrismaSchedulingRepository } from './repositories/prisma-scheduling.repository'

@Module({
	imports: [PrismaCoreModule, forwardRef(() => FacadeModule)],
	providers: [
		{
			provide: SchedulingRepository,
			useClass: PrismaSchedulingRepository,
		},
	],
	exports: [SchedulingRepository],
})
export class PrismaSchedulingModule {}
