import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { AgentFacade } from '@/application/facades/agent/agent.facade'
import { IEnvService } from '@/core/repositories/env-service.interface'
import { Token, TokenType } from '@/domain/token/entities/token.entity'
import { MailStrategy } from './contract/mail'

interface TokenMailSendProps {
	token: Token
	publicToken: string
}

interface TokenMailSenderStrategyMap {
	Invite: TokenMailSendProps
	EmailVerification: TokenMailSendProps
	PasswordRecovery: TokenMailSendProps
}

@Injectable()
export class InviteMailSend implements MailStrategy<TokenMailSendProps> {
	constructor(
		private agentFacade: AgentFacade,
		private mailerService: MailerService,
	) {}
	async send({ token, publicToken }: TokenMailSendProps): Promise<void> {
		const { agent } = await this.agentFacade.getAgent('id', {
			agentId: token.agentId.toString(),
		})
		await this.mailerService.sendMail({
			to: agent.email,
			subject: `Seu convite está aqui – comece a gerenciar seus Leads`,
			template: 'invite',
			context: {
				name: agent.name,
				publicToken,
			},
		})
	}
}

@Injectable()
export class PasswordRecoveryMailSend implements MailStrategy<TokenMailSendProps> {
	constructor(
		private agentFacade: AgentFacade,
		private mailerService: MailerService,
		private envService: IEnvService,
	) {}
	async send({ token, publicToken }: TokenMailSendProps): Promise<void> {
		const { agent } = await this.agentFacade.getAgent('id', {
			agentId: token.id.toString(),
		})
		await this.mailerService.sendMail({
			to: agent.email,
			subject: this.envService.get('SMTP_FROM'),
			template: '../templates/invite',
			context: {},
		})
	}
}

@Injectable()
export class EmailVerificationMailSend implements MailStrategy<TokenMailSendProps> {
	constructor(
		private agentFacade: AgentFacade,
		private mailerService: MailerService,
		private envService: IEnvService,
	) {}
	async send({ token, publicToken }: TokenMailSendProps): Promise<void> {
		const { agent } = await this.agentFacade.getAgent('id', {
			agentId: token.id.toString(),
		})
		await this.mailerService.sendMail({
			to: agent.email,
			subject: this.envService.get('SMTP_FROM'),
			template: '../templates/invite',
			context: {},
		})
	}
}

@Injectable()
export class TokenMailSenderFactory {
	constructor(
		private inviteMailSend: InviteMailSend,
		private passwordRecoveryMailSend: PasswordRecoveryMailSend,
		private emailVerificationMailSend: EmailVerificationMailSend,
	) {}
	async getSender<T extends keyof TokenMailSenderStrategyMap>(
		type: TokenType,
	): Promise<MailStrategy<TokenMailSenderStrategyMap[T]>> {
		if (type === 'Invite') {
			return this.inviteMailSend as MailStrategy<TokenMailSenderStrategyMap[T]>
		}

		if (type === 'EmailVerification') {
			return this.emailVerificationMailSend as MailStrategy<TokenMailSenderStrategyMap[T]>
		}

		if (type === 'PasswordRecovery') {
			return this.passwordRecoveryMailSend as MailStrategy<TokenMailSenderStrategyMap[T]>
		}

		throw new Error('')
	}
}
