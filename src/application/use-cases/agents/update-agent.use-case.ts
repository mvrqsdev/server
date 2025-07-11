import { Injectable } from '@nestjs/common'
import { HashGenerator } from '@/application/cryptography/hash-generator'
import { AgentRepository } from '@/application/repositories/agents/agent.repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentAlreadyExistsError } from './errors/agent-already-exists.error'

export interface UpdateAgentUseCaseRequest {
	agentId: string
	name: string
	email: string
	password?: string
	master?: boolean
	role?: 'Admin' | 'Marketing' | 'Agent'
	isInRotation?: boolean
	status?: 'Active' | 'Inactive'
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
		isInRotation,
		master,
		status,
	}: UpdateAgentUseCaseRequest): Promise<UpdateAgentUseCaseResponse> {
		const agent = await this.agentRepository.findById(agentId)

		if (!agent) {
			return left(new ResourceNotFoundError())
		}

		const agentWithSameEmail = await this.agentRepository.findByEmail(email)

		if (agentWithSameEmail && agentWithSameEmail.id.toString() !== agentId) {
			return left(new AgentAlreadyExistsError())
		}

		const hashedPassword = password
			? await this.hashGenerator.hash(password)
			: agent.password
		agent.name = name
		agent.email = email
		agent.password = hashedPassword
		agent.role = role ?? agent.role
		agent.master = master ?? agent.master
		agent.isInRotation = isInRotation ?? agent.isInRotation
		agent.status = status ?? agent.status

		await this.agentRepository.save(agent)

		return right({ agent })
	}
}
