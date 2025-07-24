import { Injectable } from '@nestjs/common'
import { AgentValidateStrategy } from '@/application/facades/agent/contract/agent-validate-strategy'
import { AgentRepository } from '@/application/repositories/agent.repository'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentAlreadyExistsWithSameEmailError } from './errors/agent-already-exists-with-same-email.error'

export interface CheckIfThereNoAgentWithThisEmailUseCaseRequest {
	agent?: Agent
	email: string
}

@Injectable()
export class CheckIfThereNoAgentWithThisEmailUseCase
	implements AgentValidateStrategy<CheckIfThereNoAgentWithThisEmailUseCaseRequest>
{
	constructor(private agentRepository: AgentRepository) {}
	async execute({
		email,
		agent,
	}: CheckIfThereNoAgentWithThisEmailUseCaseRequest): Promise<void> {
		const agentWithSameEmail = await this.agentRepository.findByEmail(email)

		if (agent) {
			if (agentWithSameEmail) {
				if (!agentWithSameEmail.id.equals(agent.id)) {
					throw new AgentAlreadyExistsWithSameEmailError()
				}
			}
		}

		if (!agent) {
			if (agentWithSameEmail) {
				throw new AgentAlreadyExistsWithSameEmailError()
			}
		}
	}
}
