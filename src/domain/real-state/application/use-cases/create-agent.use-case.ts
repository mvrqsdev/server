import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { HashGenerator } from '@/domain/real-state/application/cryptography/hash-generator'
import { Agent } from '../../enterprise/entities/agent.entity'
import { AgentRepository } from '../repositories/agent.repository'
import { AgentAlreadyExistsError } from './errors/agent-already-exists.error'

export interface CreateAgentUseCaseRequest {
	name: string
	email: string
	password: string
	image?: string
	roleIds: string[]
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
		})

		await this.agentRepository.create(agent)

		return right({ agent })
	}
}
