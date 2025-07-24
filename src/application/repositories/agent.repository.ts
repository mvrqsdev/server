import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentDetails } from '@/domain/agent/value-objects/agent-details.value-object'
import { Role } from '@/domain/role/entities/role.entity'
import { GetManyAgentsByFilterUseCaseRequest } from '../use-cases/agent/get-many-agents-by-filters.use-case'

export abstract class AgentRepository {
	abstract findById(id: string): Promise<Agent | null>
	abstract findByEmail(email: string): Promise<Agent | null>
	abstract findDetailsById(id: string): Promise<AgentDetails | null>
	abstract findManyByFilters(
		params: GetManyAgentsByFilterUseCaseRequest,
	): Promise<Agent[]>
	abstract findManyByIds(agentIds: string[]): Promise<Agent[]>

	abstract findManyByRole(role: Role): Promise<Agent[]>
	abstract addAgentsToRole(role: Role, agents: Agent[]): Promise<void>
	abstract removeAgentsFromRole(role: Role, agents: Agent[]): Promise<void>

	abstract create(agent: Agent): Promise<void>
	abstract save(agent: Agent): Promise<void>
}
