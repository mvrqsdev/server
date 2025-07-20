import { Injectable } from '@nestjs/common'
import { TokenFacade, TokenProps } from '@/application/facades/token/token.facade'
import { Token } from '@/domain/token/token.entity'

@Injectable()
export class NestTokenFacade implements TokenFacade {
	createInviteAndSend(params: TokenProps): Promise<{ token: Token }> {
		throw new Error('Method not implemented.')
	}
	findByToken(): Promise<{ token: Token }> {
		throw new Error('Method not implemented.')
	}
	getActiveInviteTokensByAgentId(): Promise<{ tokens: Token[] }> {
		throw new Error('Method not implemented.')
	}
	getActivePasswordRecoveryTokensByAgentId(): Promise<{ tokens: Token[] }> {
		throw new Error('Method not implemented.')
	}
	getActiveEmailVerificationsTokenByAgentId(): Promise<{ tokens: Token[] }> {
		throw new Error('Method not implemented.')
	}
	updateToken(): Promise<{ token: Token }> {
		throw new Error('Method not implemented.')
	}
}
