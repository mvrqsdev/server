import { Connection } from '../../enterprise/entities/connection.entity'

export abstract class ConnectionRepository {
	abstract findById(id: string): Promise<Connection | null>
	abstract findByAgentId(id: string): Promise<Connection | null>
	abstract delete(connection: Connection): Promise<void>
	abstract create(connection: Connection): Promise<void>
	abstract save(connection: Connection): Promise<void>
}
