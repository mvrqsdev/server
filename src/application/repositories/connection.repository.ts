import { Connection } from '@/domain/connection/entities/connection.entity'

export abstract class ConnectionRepository {
	abstract create(connection: Connection): Promise<void>
	abstract save(connection: Connection): Promise<void>
}
