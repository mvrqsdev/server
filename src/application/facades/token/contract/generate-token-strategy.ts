import { Agent } from '@/domain/agent/entities/agent.entity'
import { Token } from '@/domain/token/entities/token.entity'

export interface GenerateTokenStrategyProps {
	agent: Agent
}

export abstract class GenerateTokenStrategy {
	abstract getToken(params: GenerateTokenStrategyProps): Promise<{ token: Token }>
}
