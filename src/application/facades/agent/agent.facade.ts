// facade/agent.facade.ts

import { AgentStrategyTypeMap } from '@/application/use-cases/agent/factories/get-agent-strategy.factory'
import { GetManyAgentsStrategyTypeMap } from '@/application/use-cases/agent/factories/get-many-agents-strategy.factory'
import { ValidateAgentStrategyMap } from '@/application/use-cases/agent/factories/get-validate-agent-strategy.factory'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentCreate, AgentUpdate } from './interface'

type ValidateAgentInputMap = {
	[K in keyof ValidateAgentStrategyMap]: ValidateAgentStrategyMap[K] extends void
		? { type: K }
		: { type: K; config: Omit<ValidateAgentStrategyMap[K], 'agent'> }
}

export type ValidateAgentInput = ValidateAgentInputMap[keyof ValidateAgentInputMap]

export abstract class AgentFacade {
	abstract create(params: AgentCreate): Promise<{ agent: Agent }>
	abstract update<T extends keyof AgentStrategyTypeMap>(
		type: T,
		data: AgentStrategyTypeMap[T],
		params: AgentUpdate,
	): Promise<{ agent: Agent }>

	abstract validate<
		T extends keyof AgentStrategyTypeMap,
		D extends AgentStrategyTypeMap[T],
	>(type: T, data: D, validations: ValidateAgentInput[]): Promise<{ agent: Agent }>

	abstract getAgent<T extends keyof AgentStrategyTypeMap>(
		type: T,
		data: AgentStrategyTypeMap[T],
	): Promise<{ agent: Agent }>

	abstract getMany<T extends keyof GetManyAgentsStrategyTypeMap>(
		type: T,
		data: GetManyAgentsStrategyTypeMap[T],
	): Promise<{ agents: Agent[] }>
}
