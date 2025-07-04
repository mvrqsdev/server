import { Agent } from '../../enterprise/entities/agent.entity'

export abstract class AgentRepository {
	abstract findById(id: string): Promise<Agent | null>
	abstract findByEmail(email: string): Promise<Agent | null>
	abstract findAdmins(): Promise<Agent[]>
	abstract findAgentsInRotation(): Promise<Agent[]>
	abstract create(agent: Agent): Promise<void>
	abstract save(agent: Agent): Promise<void>
}
