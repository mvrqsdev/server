import { Connection } from '@/domain/connection/entities/connection.entity'

export class ConnectionPresenter {
	static toHTTP(connection: Connection) {
		return {
			id: connection.id.toString(),
			name: connection.name.toString(),
			number: connection.number.number,
			instanceId: connection.instanceId.toString(),
			token: connection.token.toString(),
			principal: connection.principal,
			agentId: connection.agentId.toString(),
			createdAt: connection.createdAt,
			updatedAt: connection.updatedAt,
		}
	}
}
