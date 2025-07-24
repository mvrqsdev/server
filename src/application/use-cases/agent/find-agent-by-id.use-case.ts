import { Injectable } from '@nestjs/common'
import { GetAgentStrategy } from '@/application/facades/agent/contract/get-agent-strategy'
import { AgentRepository } from '@/application/repositories/agent.repository'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentNotFoundError } from './errors/agent-not-found.error'

export interface FindAgentByIdUseCaseRequest {
	agentId: string
}

@Injectable()
export class FindAgentByIdUseCase
	implements GetAgentStrategy<FindAgentByIdUseCaseRequest>
{
	constructor(private agentRepository: AgentRepository) {}
	async execute({ agentId }: FindAgentByIdUseCaseRequest): Promise<{ agent: Agent }> {
		const agent = await this.agentRepository.findById(agentId)
		if (!agent) {
			throw new AgentNotFoundError()
		}
		return {
			agent,
		}
	}
}
