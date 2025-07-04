import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { HashGenerator } from '@/domain/real-state/application/cryptography/hash-generator'
import { Agent } from '../../enterprise/entities/agent.entity'
import { AgentRepository } from '../repositories/agent.repository'
import { AgentAlreadyExistsError } from './errors/agent-already-exists.error'

export interface UpdateAgentUseCaseRequest {
	agentId: string
	name: string
	email: string
	password: string
	role: 'Admin' | 'Marketing' | 'Agent'
	status: 'Active' | 'Inactive'
}

type UpdateAgentUseCaseResponse = Either<ResourceNotFoundError, { agent: Agent }>
@Injectable()
export class UpdateAgentUseCase {
	constructor(
		private agentRepository: AgentRepository,
		private hashGenerator: HashGenerator,
	) {}

	async execute({
		agentId,
		name,
		email,
		password,
		role,
		status,
	}: UpdateAgentUseCaseRequest): Promise<UpdateAgentUseCaseResponse> {
		const agent = await this.agentRepository.findById(agentId)

		if (!agent) {
			return left(new ResourceNotFoundError())
		}

		const agentWithSameEmail = await this.agentRepository.findByEmail(email)

		if (agentWithSameEmail && agentWithSameEmail.id.toString() !== agentId) {
			return left(new AgentAlreadyExistsError(email))
		}

		const hashedPassword = await this.hashGenerator.hash(password)
		agent.name = name
		agent.email = email
		agent.password = hashedPassword
		agent.role = role
		agent.status = status

		await this.agentRepository.save(agent)

		return right({ agent })
	}
}
