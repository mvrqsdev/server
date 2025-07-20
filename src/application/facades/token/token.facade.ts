import { Token, TokenType } from '@/domain/token/token.entity'

export interface TokenProps {
	type: TokenType
	agentId: string
}

export abstract class TokenFacade {
	abstract createInviteAndSend(params: TokenProps): Promise<{ token: Token }>
	abstract findByToken(): Promise<{ token: Token }>
	abstract getActiveInviteTokensByAgentId(): Promise<{ tokens: Token[] }>
	abstract getActivePasswordRecoveryTokensByAgentId(): Promise<{ tokens: Token[] }>
	abstract getActiveEmailVerificationsTokenByAgentId(): Promise<{ tokens: Token[] }>
	abstract updateToken(): Promise<{ token: Token }>
}
