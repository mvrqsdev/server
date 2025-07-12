import { Lead } from '@/domain/lead/entities/lead.entity'

export class LeadPresenter {
	static toHTTP(lead: Lead) {
		return {
			id: lead.id.toString(),
			contactId: lead.contactId.toString(),
			agentId: lead.contactId.toString(),
			converted: lead.converted,
			status: lead.status.state,
			value: lead.value,
			createdAt: lead.createdAt,
			updatedAt: lead.updatedAt,
		}
	}
}
