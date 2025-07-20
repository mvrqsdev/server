import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { IEnvService } from '@/core/repositories/env-service.interface'
import { EnvModule } from '../env/env.module'
import { RouletteQueueModule } from './roulette/roulette-queue.module'

@Module({
	imports: [
		// BullModule.forRootAsync({
		// 	imports: [EnvModule],
		// 	inject: [IEnvService],
		// 	useFactory: async (envService: IEnvService) => ({
		// 		connection: {
		// 			url: envService.get('REDIS_URI'),
		// 		},
		// 		defaultJobOptions: {
		// 			removeOnComplete: 100,
		// 			removeOnFail: 1000,
		// 			attempts: 3,
		// 			backoff: {
		// 				type: 'exponential',
		// 				delay: 1000,
		// 			},
		// 		},
		// 	}),
		// }),
		// RouletteQueueModule,
	],
})
export class QueueModule {}
