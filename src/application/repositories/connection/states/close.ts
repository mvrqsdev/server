import { ConnectionStatus } from '@/domain/connection/contracts/connection-status.contract'
import { Connection } from '@/domain/connection/entities/connection.entity'
import { Connecting } from './connecting'
import { AlreadyCloseError } from './errors/already-close.error'
import { NecessaryOpenConnectionError } from './errors/necessary-open-connection.error'

export class Close implements ConnectionStatus {
	getName(): string {
		return 'close'
	}

	async CloseConnection(_: Connection): Promise<void> {
		throw new AlreadyCloseError()
	}
	async StartConnection(connection: Connection): Promise<void> {
		const connectingStatus = new Connecting()
		connection.status = connectingStatus
	}
	async Connect(_: Connection): Promise<void> {
		throw new NecessaryOpenConnectionError()
	}
}
