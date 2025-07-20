import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { RouletteService } from '@/application/services/roulette/roulette.service'
import { PrismaModule } from '@/infra/database/prisma/prisma.module'
import { RouletteProcessor } from './roulette.processor'
import { RouletteScheduler } from './roulette.scheduler'

@Module({
	imports: [
		PrismaModule,
		BullModule.registerQueue({
			name: 'Roulette',
		}),
	],
	providers: [RouletteScheduler, RouletteProcessor, RouletteService],
})
export class RouletteQueueModule {}
