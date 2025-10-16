/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { Processor, WorkerHost } from '@nestjs/bullmq'
import { generateText } from 'ai'
import { Job } from 'bullmq'
import { ContactFacade } from '@/application/facades/contact/contact.facade'
import { IAMessageFacade } from '@/application/facades/ia-message/ia-message.facade'
import { IAMessageProcessProps } from '@/application/facades/ia-message/interface'
import { LeadFacade } from '@/application/facades/lead/lead.facade'
import { AIService } from '@/infra/services/ai/ai.service'
import { TwilioService } from '@/infra/services/twilio.service'

@Processor('ai-message-processor')
export class AIMessageProcessor extends WorkerHost {
	constructor(
		private ai: AIService,
		private twilio: TwilioService,
		private iaMessageFacade: IAMessageFacade,
		private contactFacade: ContactFacade,
		private leadFacade: LeadFacade,
	) {
		super()
	}
	async process(job: Job<IAMessageProcessProps>, token?: string): Promise<void> {
		const { WaId, ProfileName, Body, MessageType, MessageSid, To, From } = job.data

		try {
			const { contact } = await this.contactFacade.findOrCreate({
				name: ProfileName,
				number: WaId,
			})

			const { lead } = await this.leadFacade.findOrCreate({
				contactId: contact.id.toString(),
			})

			await this.iaMessageFacade.create({
				contactId: contact.id.toString(),
				content: Body,
				fromBot: false,
				leadId: lead.id.toString(),
				messageType: MessageType,
				sessionId: MessageSid,
			})

			const { iaMessages } = await this.iaMessageFacade.getMany('byLeadId', {
				leadId: lead.id.toString(),
			})

			const answer = await generateText({
				model: this.ai.model,
				system: `
				Você é um assistente de I.A de uma corretora de imóveis, você é responsável por realizar a triagem de um Lead.
				
				Para isso você deve obter informações como Localidade do Imóvel, renda familiar, se o Lead é CLT ou Autonomo.
				
				Lembre-se todo o conteúdo da sua resposta será enviado pelo WhatsApp.`.trim(),
				messages: iaMessages.map((message) => ({
					role: message.fromBot ? 'assistant' : 'user',
					content: message.content ?? 'Arquivo de Media ( pdf/image/ogg ) ...',
					createdAt: message.createdAt,
				})),
			})

			await this.iaMessageFacade.create({
				contactId: contact.id.toString(),
				content: answer.text,
				fromBot: true,
				leadId: lead.id.toString(),
				messageType: 'text',
				sessionId: MessageSid,
			})

			await this.twilio.messages.create({
				body: answer.text,
				from: To,
				to: From,
			})
		} catch (error) {
			console.log(error)
		}
	}
}
