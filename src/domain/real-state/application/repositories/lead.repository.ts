import { Agent } from '../../enterprise/entities/agent.entity'
import { Lead } from '../../enterprise/entities/lead.entity'

export abstract class LeadRepository {
	abstract findById(id: string): Promise<Lead | null>
	abstract findLeadByContactId(contactId: string): Promise<Lead | null>
	abstract findLastLeadFromAgents(agents: Agent[]): Promise<Lead | null>
	abstract create(lead: Lead): Promise<void>
	abstract save(lead: Lead): Promise<void>
}
