import { Connection } from '@/domain/connection/entities/connection.entity'

export class ConnectionPresenter {
	static toHTTP(connection: Connection) {
		return {
			id: connection.id.toString(),
			name: connection.name.value,
			whatsappNumber: connection.whatsappNumber.number,
			token: connection.token.toString(),
			agentId: connection.agentId.toString(),
			status: connection.status,
			createdAt: connection.createdAt,
			updatedAt: connection.updatedAt,
		}
	}
}
