import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentValidateStrategy } from './contract/agent-validate-strategy'
import { GetAgentStrategy } from './contract/get-agent-strategy'
import { AgentCreate } from './interface'

export abstract class AgentFacade {
	abstract create(params: AgentCreate): Promise<{ agent: Agent }>
	abstract validate<TData, TResponse>(
		strategy: AgentValidateStrategy<TData, TResponse>,
		data: TData,
	): Promise<TResponse>
	abstract getAgent<TData, TResponse>(
		strategy: GetAgentStrategy<TData, TResponse>,
		data: TData,
	): Promise<TResponse>
}
