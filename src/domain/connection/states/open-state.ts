import { DomainError } from '@/core/errors/errors/domain.error'
import { Connection } from '../entities/connection.entity'
import { Close } from './close-state'
import { ConnectionState } from './connection-state.interface'

export class Open implements ConnectionState {
	public get state(): string {
		return this.constructor.name
	}
	Close(connection: Connection): void {
		connection.status = new Close()
	}
	Connecting(_: Connection): void {
		throw new DomainError('Method not implemented.')
	}
	Open(connection: Connection): void {
		connection.status = new Open()
	}
	Inactive(_: Connection): void {
		throw new DomainError('Method not implemented.')
	}
}
