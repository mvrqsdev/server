import { Injectable } from '@nestjs/common'
import { AgentValidateStrategy } from '@/application/facades/agent/contract/agent-validate-strategy'
import { Agent } from '@/domain/agent/entities/agent.entity'

export interface CheckIfAgentHasPermissionsUseCaseRequest {
	agent: Agent
	permissions: string[]
	include: 'some' | 'every'
}

@Injectable()
export class CheckIfAgentHasPermissionsUseCase
	implements AgentValidateStrategy<CheckIfAgentHasPermissionsUseCaseRequest>
{
	async execute(params: CheckIfAgentHasPermissionsUseCaseRequest): Promise<void> {
		throw new Error('Method not implemented.')
	}
}
