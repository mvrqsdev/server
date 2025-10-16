import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { AIService } from './ai/ai.service'
import { TwilioService } from './twilio.service'

@Module({
	imports: [EnvModule],
	providers: [AIService, TwilioService],
	exports: [AIService, TwilioService],
})
export class ServicesModule {}
