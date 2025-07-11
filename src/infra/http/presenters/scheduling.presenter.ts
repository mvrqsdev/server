import { Scheduling } from '@/domain/scheduling/entities/scheduling.entity'

export class SchedulingPresenter {
	static toHTTP(scheduling: Scheduling) {
		return {
			id: scheduling.id.toString(),
			agentId: scheduling.agentId.toString(),
			leadId: scheduling.leadId.toString(),
			status: scheduling.status.state,
			scheduled: scheduling.scheduled,
			createdAt: scheduling.createdAt,
			updatedAt: scheduling.updatedAt,
		}
	}
}
