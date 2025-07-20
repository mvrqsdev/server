import { ConnectionStatus } from '@/domain/connection/contracts/connection-status.contract'
import { Connection } from '@/domain/connection/entities/connection.entity'
import { Close } from './close'
import { AlreadyOpenError } from './errors/already-open.error'

export class Open implements ConnectionStatus {
	getName(): string {
		return 'open'
	}

	async CloseConnection(connection: Connection): Promise<void> {
		const closeStatus = new Close()
		connection.status = closeStatus
	}
	async StartConnection(_: Connection): Promise<void> {
		throw new AlreadyOpenError()
	}
	async Connect(_: Connection): Promise<void> {
		throw new AlreadyOpenError()
	}
}
