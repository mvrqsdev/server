import { GetManyTokensStrategyTypeMap } from '@/application/use-cases/token/factories/get-many-tokens-strategy.factory'
import { GetTokenStrategyTypeMap } from '@/application/use-cases/token/factories/get-token-strategy.factory'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { Token, TokenType } from '@/domain/token/entities/token.entity'
import { TokenCreate } from './interface'

export interface TokenProps {
	type: TokenType
	agent: Agent
}

export abstract class TokenFacade {
	abstract create(params: TokenCreate): Promise<{ token: Token; publicToken: string }>
	abstract getToken<T extends keyof GetTokenStrategyTypeMap>(
		type: T,
		data: GetTokenStrategyTypeMap[T],
	): Promise<{ token: Token }>
	abstract getTokens<T extends keyof GetManyTokensStrategyTypeMap>(
		type: T,
		data: GetManyTokensStrategyTypeMap[T],
	): Promise<{ tokens: Token[] }>

	abstract markTokenUsed<T extends keyof GetTokenStrategyTypeMap>(
		type: T,
		data: GetTokenStrategyTypeMap[T],
	): Promise<{ token: Token }>
}
