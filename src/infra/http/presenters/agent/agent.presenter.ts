import { Agent } from '@/domain/agent/entities/agent.entity'

export class AgentPresenter {
	static toHTTP(agent: Agent) {
		return {
			id: agent.id.toString(),
			name: agent.name,
			email: agent.email,
			master: agent.master,
			isInRotation: agent.isInRotation,
			status: agent.status,
			createdAt: agent.createdAt,
			updatedAt: agent.updatedAt,
		}
	}
}
