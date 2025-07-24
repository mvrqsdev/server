import { Injectable } from '@nestjs/common'
import { GetAgentStrategy } from '@/application/facades/agent/contract/get-agent-strategy'
import { AgentRepository } from '@/application/repositories/agent.repository'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentNotFoundWithThisEmailError } from './errors/agent-not-found-with-this-email.error'

export interface FindAgentByEmailUseCaseRequest {
	email: string
}

@Injectable()
export class FindAgentByEmailUseCase
	implements GetAgentStrategy<FindAgentByEmailUseCaseRequest>
{
	constructor(private agentRepository: AgentRepository) {}
	async execute({ email }: FindAgentByEmailUseCaseRequest): Promise<{ agent: Agent }> {
		const agent = await this.agentRepository.findByEmail(email)
		if (!agent) {
			throw new AgentNotFoundWithThisEmailError()
		}
		return {
			agent,
		}
	}
}
