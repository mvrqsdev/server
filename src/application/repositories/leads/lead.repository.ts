import { Agent } from '@/domain/agent/entities/agent.entity'
import { Lead } from '@/domain/lead/entities/lead.entity'
import { LeadDetails } from '@/domain/lead/value-objects/lead-datails.value-object'

export abstract class LeadRepository {
	abstract findById(id: string): Promise<Lead | null>
	abstract findDetailsById(id: string): Promise<LeadDetails | null>
	abstract findCurrentLeads(): Promise<Lead[]>
	abstract findLastLeadByContactId(contactId: string): Promise<Lead | null>
	abstract findLastLeadFromAgents(agents: Agent[]): Promise<Lead | null>
	abstract create(lead: Lead): Promise<void>
	abstract save(lead: Lead): Promise<void>
}
