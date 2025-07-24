import { Injectable } from '@nestjs/common'
import { HashGenerator } from '@/application/cryptography/hash-generator'
import { AgentRepository } from '@/application/repositories/agent.repository'
import { RoleRepository } from '@/application/repositories/role.repository'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentRoles } from '@/domain/agent/entities/agent-roles.watched-list'
import { RoleNotFoundError } from '../role/errors/role-not-found.error'
import { AgentAlreadyExistsWithSameEmailError } from './errors/agent-already-exists-with-same-email.error'

interface UpdateAgentUseCaseRequest {
	agent: Agent
	name?: string
	email?: string
	password?: string
	roles?: string[]
	status?: 'Invited' | 'Inactive'
}

interface UpdateAgentUseCaseResponse {
	agent: Agent
}

@Injectable()
export class UpdateAgentUseCase
	implements BaseUseCase<UpdateAgentUseCaseRequest, UpdateAgentUseCaseResponse>
{
	constructor(
		private agentRepository: AgentRepository,
		private hashGenerator: HashGenerator,
		private roleRepository: RoleRepository,
	) {}
	async execute({
		agent,
		name,
		email,
		password,
		roles,
		status,
	}: UpdateAgentUseCaseRequest): Promise<UpdateAgentUseCaseResponse> {
		if (email) {
			const agentWithSameEmail = await this.agentRepository.findByEmail(email)

			if (agentWithSameEmail) {
				const isSameAgent = agentWithSameEmail.id.equals(agent.id)

				if (!isSameAgent) {
					throw new AgentAlreadyExistsWithSameEmailError()
				}
			}
			agent.email = email
		}

		if (name) {
			agent.name = name
		}

		if (password) {
			const hashedPassword = await this.hashGenerator.hash(password)
			agent.password = hashedPassword
		}

		if (roles) {
			// Obtém as roles do agent e cria o WatchedList AgentRoles com as roles do agente.
			const currentAgentRoles = await this.roleRepository.findManyByAgent(agent)
			const agentRoles = new AgentRoles(currentAgentRoles)

			// Obtem as roles informadas no parametro
			const fetchedRoles = await this.roleRepository.findManyByIds(roles)
			if (fetchedRoles.length !== roles.length) {
				throw new RoleNotFoundError()
			}
			agentRoles.update(fetchedRoles)

			agent.roles = agentRoles
		}

		if (status && status === 'Inactive') {
			agent.inactiveAgent()
		}

		if (status && status === 'Invited') {
			agent.inviteAgent()
		}

		await this.agentRepository.save(agent)

		return {
			agent,
		}
	}
}
