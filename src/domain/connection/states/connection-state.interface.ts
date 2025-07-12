import { Connection } from '../entities/connection.entity'

export abstract class ConnectionState {
	public get state() {
		return this.constructor.name
	}

	abstract Close(connection: Connection): void
	abstract Connecting(connection: Connection): void
	abstract Open(connection: Connection): void
	abstract Inactive(connection: Connection): void
}
