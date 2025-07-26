import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Job } from 'bullmq'
import { ContactFacade } from '@/application/facades/contact/contact.facade'
import { IAMessageFacade } from '@/application/facades/ia-message/ia-message.facade'
import { IAMessageProcessProps } from '@/application/facades/ia-message/interface'
import { LeadFacade } from '@/application/facades/lead/lead.facade'
import { AIService } from '@/infra/services/ai/ai.service'

@Processor('ai-message-processor')
export class AIMessageProcessor extends WorkerHost {
	constructor(
		private ai: AIService,
		private aiMessageFacade: IAMessageFacade,
		private contactFacade: ContactFacade,
		private leadFacade: LeadFacade,
	) {
		super()
	}
	async process(job: Job<IAMessageProcessProps>, token?: string): Promise<void> {
		console.log(job)
	}
}
