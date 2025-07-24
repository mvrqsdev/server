import { Agent } from '@/domain/agent/entities/agent.entity'
export abstract class GetAgentStrategy<TData> {
	abstract execute(params: TData): Promise<{ agent: Agent }>
}
