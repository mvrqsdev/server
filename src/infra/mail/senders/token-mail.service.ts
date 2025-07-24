import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { AgentFacade } from '@/application/facades/agent/agent.facade'
import { Token } from '@/domain/token/entities/token.entity'

@Injectable()
export class TokenMailService {
	constructor(
		private mailerService: MailerService,
		private agentFacade: AgentFacade,
	) {}
	async sendInviteMail({ token }: Token) {}
}
