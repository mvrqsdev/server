import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentValidateStrategy } from './contract/agent-validate-strategy'
import { GetAgentStrategy } from './contract/get-agent-strategy'
import { GetManyAgentsStrategy } from './contract/get-many-agents-strategy'
import { AgentCreate, AgentUpdate } from './interface'

export abstract class AgentFacade {
	abstract create(params: AgentCreate): Promise<{ agent: Agent }>
	abstract update(params: AgentUpdate): Promise<{ agent: Agent }>
	abstract validate<TData>(
		strategy: AgentValidateStrategy<TData>,
		data: TData,
	): Promise<{ agent: Agent }>
	abstract getAgent<TData, TResponse>(
		strategy: GetAgentStrategy<TData, TResponse>,
		data: TData,
	): Promise<TResponse>

	abstract getMany<TData, TResponse>(
		strategy: GetManyAgentsStrategy<TData, TResponse>,
		data: TData,
	): Promise<TResponse>
}
