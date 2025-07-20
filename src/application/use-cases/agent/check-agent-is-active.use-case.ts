import { Injectable } from '@nestjs/common'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentIsNotActiveError } from './errors/agent-is-not-active.error'

interface CheckAgentIsActiveUseCaseRequest {
	agent: Agent
}

@Injectable()
export class CheckAgentIsActiveUseCase
	implements BaseUseCase<CheckAgentIsActiveUseCaseRequest, void>
{
	async execute({ agent }: CheckAgentIsActiveUseCaseRequest): Promise<void> {
		const agentStatus = agent.status.getName()

		if (agentStatus !== 'Active') {
			throw new AgentIsNotActiveError()
		}
	}
}
