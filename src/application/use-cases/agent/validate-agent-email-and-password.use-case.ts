import { Injectable } from '@nestjs/common'
import { HashComparer } from '@/application/cryptography/hash-comparer'
import { AgentValidateStrategy } from '@/application/facades/agent/contract/agent-validate-strategy'
import { AgentRepository } from '@/application/repositories/agent/agent.repository'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'

interface ValidateAgentEmailAndPasswordUseCaseRequest {
	email: string
	password: string
}

@Injectable()
export class ValidateAgentEmailAndPasswordUseCase
	implements AgentValidateStrategy<ValidateAgentEmailAndPasswordUseCaseRequest, void>
{
	constructor(
		private agentRepository: AgentRepository,
		private hashComparer: HashComparer,
	) {}
	async validate({
		email,
		password,
	}: ValidateAgentEmailAndPasswordUseCaseRequest): Promise<void> {
		const agent = await this.agentRepository.findByEmail(email)

		if (!agent) {
			throw new InvalidCredentialsError()
		}

		const isValidPassword = await this.hashComparer.compare(password, agent.password)

		if (!isValidPassword) {
			throw new InvalidCredentialsError()
		}
	}
}
