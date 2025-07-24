import { Agent } from '@/domain/agent/entities/agent.entity'

export abstract class GetManyAgentsStrategy<TData> {
	abstract execute(params: TData): Promise<{ agents: Agent[] }>
}
