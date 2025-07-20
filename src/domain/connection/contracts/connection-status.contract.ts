import { Connection } from '../entities/connection.entity'

export abstract class ConnectionStatus {
	abstract getName(): string
	abstract CloseConnection(connection: Connection): Promise<void>
	abstract StartConnection(connection: Connection): Promise<void>
	abstract Connect(connection: Connection): Promise<void>
}
