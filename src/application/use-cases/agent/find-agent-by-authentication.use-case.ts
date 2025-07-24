import { Injectable } from '@nestjs/common'
import { GetAgentStrategy } from '@/application/facades/agent/contract/get-agent-strategy'
import { AgentRepository } from '@/application/repositories/agent.repository'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'
import { AgentNotFoundError } from './errors/agent-not-found.error'

export interface FindAgentByAuthenticationUseCaseRequest {
	authentication: Authentication
}
@Injectable()
export class FindAgentByAuthenticationUseCase
	implements GetAgentStrategy<FindAgentByAuthenticationUseCaseRequest>
{
	constructor(private agentRepository: AgentRepository) {}
	async execute({
		authentication,
	}: FindAgentByAuthenticationUseCaseRequest): Promise<{ agent: Agent }> {
		const agent = await this.agentRepository.findById(authentication.agentId.toString())
		if (!agent) {
			throw new AgentNotFoundError()
		}
		return {
			agent,
		}
	}
}
