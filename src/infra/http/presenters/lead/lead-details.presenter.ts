import { LeadDetails } from '@/domain/lead/value-objects/lead-datails.value-object'
import { AgentPresenter } from '../agent/agent.presenter'
import { ContactPresenter } from '../contact/contact.presenter'
import { SchedulingPresenter } from '../scheduling/scheduling.presenter'

export class LeadDetailsPresenter {
	static toHTTP(leadDetails: LeadDetails) {
		return {
			id: leadDetails.leadId.toString(),
			contactId: leadDetails.contactId.toString(),
			contact: ContactPresenter.toHTTP(leadDetails.contact),
			agentId: leadDetails.agentId.toString(),
			agent: AgentPresenter.toHTTP(leadDetails.agent),
			schedulings: leadDetails.schedulings.map(SchedulingPresenter.toHTTP),
			converted: leadDetails.converted,
			status: leadDetails.status.state,
			value: leadDetails.value,
			createdAt: leadDetails.createdAt,
			updatedAt: leadDetails.updatedAt,
		}
	}
}
