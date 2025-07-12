import { Agent } from '@/domain/agent/entities/agent.entity'

export class AgentPresenter {
	static toHTTP(agent: Agent) {
		return {
			id: agent.id.toString(),
			name: agent.name,
			master: agent.master,
			isInRotation: agent.isInRotation,
			role: agent.role,
		}
	}
}
