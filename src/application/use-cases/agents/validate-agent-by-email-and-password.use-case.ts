import { Injectable } from '@nestjs/common'
import { HashComparer } from '@/application/cryptography/hash-comparer'
import { AgentRepository } from '@/application/repositories/agents/agent.repository'
import { Either, left, right } from '@/core/either'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentInvalidCredentialsError } from './errors/agent-invalid-credentials.error'

export interface ValidateAgentByEmailAndPasswordUseCaseRequest {
	email: string
	password: string
}

type ValidateAgentByEmailAndPasswordUseCaseResponse = Either<
	AgentInvalidCredentialsError,
	{ agent: Agent }
>

@Injectable()
export class ValidateAgentByEmailAndPasswordUseCase {
	constructor(
		private agentRepository: AgentRepository,
		private hashComparer: HashComparer,
	) {}

	async execute({
		email,
		password,
	}: ValidateAgentByEmailAndPasswordUseCaseRequest): Promise<ValidateAgentByEmailAndPasswordUseCaseResponse> {
		const agent = await this.agentRepository.findByEmail(email)

		if (!agent) {
			return left(new AgentInvalidCredentialsError())
		}

		const isValidPassword = await this.hashComparer.compare(password, agent.password)

		if (!isValidPassword) {
			return left(new AgentInvalidCredentialsError())
		}

		return right({
			agent,
		})
	}
}
