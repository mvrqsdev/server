import { Injectable } from '@nestjs/common'
import { GetAgentStrategy } from '@/application/facades/agent/contract/get-agent-strategy'
import { AgentRepository } from '@/application/repositories/agent/agent.repository'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentNotFoundError } from './errors/agent-not-found.error'

interface FindAgentByIdUseCaseRequest {
	agentId: string
}

interface FindAgentByIdUseCaseResponse {
	agent: Agent
}

@Injectable()
export class FindAgentByIdUseCase
	implements GetAgentStrategy<FindAgentByIdUseCaseRequest, FindAgentByIdUseCaseResponse>
{
	constructor(private agentRepository: AgentRepository) {}
	async execute({
		agentId,
	}: FindAgentByIdUseCaseRequest): Promise<FindAgentByIdUseCaseResponse> {
		const agent = await this.agentRepository.findById(agentId)
		if (!agent) {
			throw new AgentNotFoundError()
		}
		return {
			agent,
		}
	}
}
