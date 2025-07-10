import { Injectable } from '@nestjs/common'
import { HashGenerator } from '@/application/cryptography/hash-generator'
import { AgentRepository } from '@/application/repositories/agents/agent.repository'
import { Either, left, right } from '@/core/either'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentAlreadyExistsError } from './errors/agent-already-exists.error'

export interface CreateAgentUseCaseRequest {
	name: string
	email: string
	password: string
	master: boolean
	role: 'Admin' | 'Marketing' | 'Agent'
	isInRotation: boolean
}

type CreateAgentUseCaseResponse = Either<AgentAlreadyExistsError, { agent: Agent }>
@Injectable()
export class CreateAgentUseCase {
	constructor(
		private agentRepository: AgentRepository,
		private hashGenerator: HashGenerator,
	) {}

	async execute({
		name,
		email,
		password,
		isInRotation,
		master,
		role,
	}: CreateAgentUseCaseRequest): Promise<CreateAgentUseCaseResponse> {
		const agentWithSameEmail = await this.agentRepository.findByEmail(email)

		if (agentWithSameEmail) {
			return left(new AgentAlreadyExistsError(email))
		}

		const hashedPassword = await this.hashGenerator.hash(password)

		const agent = Agent.create({
			name,
			email,
			password: hashedPassword,
			isInRotation,
			role,
			master,
		})

		await this.agentRepository.create(agent)

		return right({ agent })
	}
}
