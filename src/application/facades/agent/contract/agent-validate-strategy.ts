import { Agent } from '@/domain/agent/entities/agent.entity'

export abstract class AgentValidateStrategy<TData> {
	abstract validate(params: TData): Promise<{ agent: Agent }>
}
