import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentDetails } from '@/domain/agent/value-objects/agent-details.value-object'

export abstract class AgentRepository {
	abstract findById(id: string): Promise<Agent | null>
	abstract findDetailsById(id: string): Promise<AgentDetails | null>
	abstract findByEmail(email: string): Promise<Agent | null>
	abstract findAdmins(): Promise<Agent[]>
	abstract findMaster(): Promise<Agent | null>
	abstract findAgentsInRotation(): Promise<Agent[]>
	abstract create(agent: Agent): Promise<void>
	abstract save(agent: Agent): Promise<void>
}
