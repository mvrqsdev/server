import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { RouletteService } from '@/application/services/roulette/roulette.service'
import { UpdateInactiveLeadAgentUseCase } from '@/application/use-cases/roulette/update-inactive-lead-agent.use-case'
import { DatabaseModule } from '@/infra/database/database.module'
import { RouletteProcessor } from './roulette.processor'
import { RouletteScheduler } from './roulette.scheduler'

@Module({
	imports: [
		DatabaseModule,
		BullModule.registerQueue({
			name: 'Roulette',
		}),
	],
	providers: [
		RouletteScheduler,
		RouletteProcessor,
		RouletteService,
		UpdateInactiveLeadAgentUseCase,
	],
})
export class RouletteQueueModule {}
