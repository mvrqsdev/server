import { BullModule } from '@nestjs/bullmq'
import { forwardRef, Module } from '@nestjs/common'
import { IEnvService } from '@/core/repositories/env-service.interface'
import { PrismaModule } from '../database/prisma/prisma.module'
import { EnvModule } from '../env/env.module'
import { FacadeModule } from '../http/facades/facade.module'
import { MailModule } from '../mail/mail.module'
import { ServicesModule } from '../services/services.module'
import { AIMessageProcessor } from './ai/ai.processor'
import { TokenMailProcessor } from './mail/token-mail.processor'
// import { RouletteQueueModule } from './roulette/roulette-queue.module'

@Module({
	imports: [
		MailModule,
		forwardRef(() => EnvModule),
		forwardRef(() => ServicesModule),
		forwardRef(() => FacadeModule),
		forwardRef(() => PrismaModule),
		BullModule.forRootAsync({
			imports: [EnvModule],
			inject: [IEnvService],
			useFactory: async (envService: IEnvService) => ({
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
		BullModule.registerQueue({ name: 'token-mail' }),
		BullModule.registerQueue({ name: 'ai-message-processor' }),
		// RouletteQueueModule,
	],
	providers: [TokenMailProcessor, AIMessageProcessor],
	exports: [BullModule],
})
export class QueueModule {}
