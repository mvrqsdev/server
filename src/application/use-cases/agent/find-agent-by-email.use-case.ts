import { Injectable } from '@nestjs/common'
import { GetAgentStrategy } from '@/application/facades/agent/contract/get-agent-strategy'
import { AgentRepository } from '@/application/repositories/agent/agent.repository'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentNotFoundWithThisEmailError } from './errors/agent-not-found-with-this-email.error'

interface FindAgentByEmailUseCaseRequest {
	email: string
}

interface FindAgentByEmailUseCaseResponse {
	agent: Agent
}

@Injectable()
export class FindAgentByEmailUseCase
	implements
		GetAgentStrategy<FindAgentByEmailUseCaseRequest, FindAgentByEmailUseCaseResponse>
{
	constructor(private agentRepository: AgentRepository) {}
	async execute({
		email,
	}: FindAgentByEmailUseCaseRequest): Promise<FindAgentByEmailUseCaseResponse> {
		const agent = await this.agentRepository.findByEmail(email)
		if (!agent) {
			throw new AgentNotFoundWithThisEmailError()
		}
		return {
			agent,
		}
	}
}
