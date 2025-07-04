import { Agent } from '@/domain/real-state/enterprise/entities/agent.entity'

export class AgentPresenter {
	static toHTTP(agent: Agent) {
		return {
			id: agent.id.toString(),
		}
	}
}
