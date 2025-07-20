import { Injectable } from '@nestjs/common'
import { AgentValidateStrategy } from '@/application/facades/agent/contract/agent-validate-strategy'
import { Agent } from '@/domain/agent/entities/agent.entity'

interface CheckIfAgentHasPermissionsUseCaseRequest {
	agent: Agent
}

@Injectable()
export class CheckIfAgentHasPermissionsUseCase
	implements AgentValidateStrategy<CheckIfAgentHasPermissionsUseCaseRequest>
{
	async validate(
		params: CheckIfAgentHasPermissionsUseCaseRequest,
	): Promise<{ agent: Agent }> {
		throw new Error('Method not implemented.')
	}
}
