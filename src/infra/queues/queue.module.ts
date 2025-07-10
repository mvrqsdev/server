import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'
import { RouletteQueueModule } from './roulette/roulette-queue.module'

@Module({
	imports: [
		BullModule.forRootAsync({
			imports: [EnvModule],
			inject: [EnvService],
			useFactory: async (envService: EnvService) => ({
				connection: {
					url: envService.get('REDIS_URI'),
				},
				defaultJobOptions: {
					removeOnComplete: 100,
					removeOnFail: 1000,
					attempts: 3,
					backoff: {
						type: 'exponential',
						delay: 1000,
					},
				},
			}),
		}),
		RouletteQueueModule,
	],
})
export class QueueModule {}
