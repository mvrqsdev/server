import { AgentDetails } from '@/domain/agent/value-objects/agent-details.value-object'
import { ConnectionPresenter } from '../connection/connection.presenter'

export class AgentDetailsPresenter {
	static toHTTP(agentDetails: AgentDetails) {
		return {
			id: agentDetails.agentId.toString(),
			name: agentDetails.name,
			email: agentDetails.email,
			master: agentDetails.master,
			isInRotation: agentDetails.isInRotation,
			status: agentDetails.status,
			createdAt: agentDetails.createdAt,
			updatedAt: agentDetails.updatedAt,
			connections: agentDetails.connections.map(ConnectionPresenter.toHTTP),
		}
	}
}
