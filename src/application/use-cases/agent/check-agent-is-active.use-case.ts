import { Injectable } from '@nestjs/common'
import { AgentValidateStrategy } from '@/application/facades/agent/contract/agent-validate-strategy'
import { Agent } from '@/domain/agent/entities/agent.entity'

export interface CheckAgentIsActiveUseCaseRequest {
	agent: Agent
}

@Injectable()
export class CheckAgentIsActiveUseCase
	implements AgentValidateStrategy<CheckAgentIsActiveUseCaseRequest>
{
	async execute(params: CheckAgentIsActiveUseCaseRequest): Promise<void> {
		throw new Error('Method not implemented.')
	}
}
