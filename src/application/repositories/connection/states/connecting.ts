import { ConnectionStatus } from '@/domain/connection/contracts/connection-status.contract'
import { Connection } from '@/domain/connection/entities/connection.entity'
import { Close } from './close'
import { AlreadyConnectingError } from './errors/already-connecting.error'
import { Open } from './open'

export class Connecting implements ConnectionStatus {
	getName(): string {
		return 'connecting'
	}

	async CloseConnection(connection: Connection): Promise<void> {
		const closeStatus = new Close()
		connection.status = closeStatus
	}
	async StartConnection(_: Connection): Promise<void> {
		throw new AlreadyConnectingError()
	}
	async Connect(connection: Connection): Promise<void> {
		const openStatus = new Open()
		connection.status = openStatus
	}
}
