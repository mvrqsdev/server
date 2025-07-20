import { Injectable } from '@nestjs/common'
import { AgentRepository } from '@/application/repositories/agent/agent.repository'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { AgentAlreadyExistsWithSameEmailError } from './errors/agent-already-exists-with-same-email.error'

interface CheckIfThereNoAgentWithThisEmailUseCaseRequest {
	email: string
}

@Injectable()
export class CheckIfThereNoAgentWithThisEmailUseCase
	implements BaseUseCase<CheckIfThereNoAgentWithThisEmailUseCaseRequest, void>
{
	constructor(private agentRepository: AgentRepository) {}
	async execute({
		email,
	}: CheckIfThereNoAgentWithThisEmailUseCaseRequest): Promise<void> {
		const agentWithSameEmail = await this.agentRepository.findByEmail(email)

		if (agentWithSameEmail) {
			throw new AgentAlreadyExistsWithSameEmailError()
		}
	}
}
