import { Injectable } from '@nestjs/common'
import { HashComparer } from '@/application/cryptography/hash-comparer'
import { AgentValidateStrategy } from '@/application/facades/agent/contract/agent-validate-strategy'
import { AgentRepository } from '@/application/repositories/agent/agent.repository'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'

interface ValidateAgentEmailAndPasswordUseCaseRequest {
	email: string
	password: string
}

interface ValidateAgentEmailAndPasswordUseCaseResponse {
	agent: Agent
}

@Injectable()
export class ValidateAgentEmailAndPasswordUseCase
	implements AgentValidateStrategy<ValidateAgentEmailAndPasswordUseCaseRequest>
{
	constructor(
		private agentRepository: AgentRepository,
		private hashComparer: HashComparer,
	) {}
	async validate({
		email,
		password,
	}: ValidateAgentEmailAndPasswordUseCaseRequest): Promise<ValidateAgentEmailAndPasswordUseCaseResponse> {
		const agent = await this.agentRepository.findByEmail(email)

		if (!agent) {
			throw new InvalidCredentialsError()
		}

		const isValidPassword = await this.hashComparer.compare(password, agent.password)

		if (!isValidPassword) {
			throw new InvalidCredentialsError()
		}

		return {
			agent,
		}
	}
}
