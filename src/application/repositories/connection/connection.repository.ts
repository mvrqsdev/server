import { Connection } from '@/domain/connection/entities/connection.entity'

export abstract class ConnectionRepository {
	abstract findById(id: string): Promise<Connection | null>
	abstract findByAgentId(id: string): Promise<Connection[]>
	abstract findByNumber(number: string): Promise<Connection | null>
	abstract findPrincipal(): Promise<Connection | null>
	abstract delete(connection: Connection): Promise<void>
	abstract create(connection: Connection): Promise<void>
	abstract save(connection: Connection): Promise<void>
}
