import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Job } from 'bullmq'
import { TokenFacade } from '@/application/facades/token/token.facade'
import { TokenMailSenderFactory } from '@/infra/mail/senders/token-mails'

@Processor('token-mail')
export class TokenMailProcessor extends WorkerHost {
	constructor(
		private tokenMailSenderFactory: TokenMailSenderFactory,
		private tokenFacade: TokenFacade,
	) {
		super()
	}
	async process(
		job: Job<{ tokenId: string; publicToken: string }>,
		_?: string,
	): Promise<void> {
		const sender = await this.tokenMailSenderFactory.getSender('Invite')
		const { tokenId, publicToken } = job.data
		const { token } = await this.tokenFacade.getToken('id', { tokenId })
		await sender.send({ token, publicToken })
	}
}
