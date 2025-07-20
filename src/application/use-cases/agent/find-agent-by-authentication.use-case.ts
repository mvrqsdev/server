import { Injectable } from '@nestjs/common'
import { GetAgentStrategy } from '@/application/facades/agent/contract/get-agent-strategy'
import { AgentRepository } from '@/application/repositories/agent/agent.repository'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'
import { AgentNotFoundError } from './errors/agent-not-found.error'

interface FindAgentByAuthenticationUseCaseRequest {
	authentication: Authentication
}

interface FindAgentByAuthenticationUseCaseResponse {
	agent: Agent
}

@Injectable()
export class FindAgentByAuthenticationUseCase
	implements
		GetAgentStrategy<
			FindAgentByAuthenticationUseCaseRequest,
			FindAgentByAuthenticationUseCaseResponse
		>
{
	constructor(private agentRepository: AgentRepository) {}
	async execute({
		authentication,
	}: FindAgentByAuthenticationUseCaseRequest): Promise<FindAgentByAuthenticationUseCaseResponse> {
		const agent = await this.agentRepository.findById(authentication.agentId.toString())
		if (!agent) {
			throw new AgentNotFoundError()
		}
		return {
			agent,
		}
	}
}
