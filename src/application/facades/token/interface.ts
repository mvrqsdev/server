import { Agent } from '@/domain/agent/entities/agent.entity'
import { Token, TokenType } from '@/domain/token/entities/token.entity'

export interface TokenCreate {
	agent: Agent
	type: TokenType
}

export interface TokenUsed {
	token: Token
}
