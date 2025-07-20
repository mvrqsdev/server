import { Injectable } from '@nestjs/common'
import { GetManyAgentsStrategy } from '@/application/facades/agent/contract/get-many-agents-strategy'
import {
	AgentRepository,
	FindManyFiltersProps,
} from '@/application/repositories/agent/agent.repository'
import { Agent } from '@/domain/agent/entities/agent.entity'

export interface GetManyAgentsByFilterUseCaseResponse {
	agents: Agent[]
}

@Injectable()
export class GetManyAgentsByFilterUseCase
	implements
		GetManyAgentsStrategy<FindManyFiltersProps, GetManyAgentsByFilterUseCaseResponse>
{
	constructor(private agentRepository: AgentRepository) {}
	async execute(
		params: FindManyFiltersProps,
	): Promise<GetManyAgentsByFilterUseCaseResponse> {
		const agents = await this.agentRepository.findManyByFilters(params)
		return {
			agents,
		}
	}
}
