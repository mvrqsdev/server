import { Injectable } from '@nestjs/common'
import { HashGenerator } from '@/application/cryptography/hash-generator'
import { TokenFacade } from '@/application/facades/token/token.facade'
import { AgentRepository } from '@/application/repositories/agent/agent.repository'
import { Inactive } from '@/application/repositories/agent/states/inactive-agent-status'
import { RoleRepository } from '@/application/repositories/role/role.repository'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentRoles } from '@/domain/agent/entities/agent-roles.watched-list'
import { RoleNotFoundError } from '../role/errors/role-not-found.error'

type CreateAgentUseCaseRequest = {
	name: string
	email: string
	password: string
	roles: string[]
}
interface CreateAgentUseCaseResponse {
	agent: Agent
}

@Injectable()
export class CreateAgentUseCase
	implements BaseUseCase<CreateAgentUseCaseRequest, CreateAgentUseCaseResponse>
{
	constructor(
		private agentRepository: AgentRepository,
		private roleRepository: RoleRepository,
		private hashGenerator: HashGenerator,
		private tokenFacade: TokenFacade,
	) {}
	async execute({
		name,
		email,
		password,
		roles,
	}: CreateAgentUseCaseRequest): Promise<CreateAgentUseCaseResponse> {
		const hashedPassword = await this.hashGenerator.hash(password)
		const agent = Agent.create({
			name,
			email,
			password: hashedPassword,
			status: new Inactive(this.tokenFacade),
		})

		const existingRoles = await this.roleRepository.findManyByIds(roles)
		if (existingRoles.length !== roles.length) {
			throw new RoleNotFoundError()
		}
		agent.roles = new AgentRoles(existingRoles)

		await this.agentRepository.create(agent)

		return {
			agent,
		}
	}
}
