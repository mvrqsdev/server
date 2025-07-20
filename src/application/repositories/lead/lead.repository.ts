import { Lead } from '@/domain/lead/entities/lead.entity'

export abstract class LeadRepository {
	abstract create(lead: Lead): Promise<void>
	abstract save(lead: Lead): Promise<void>
}
