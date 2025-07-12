import { DomainError } from '@/core/errors/errors/domain.error'
import { Connection } from '../entities/connection.entity'
import { Close } from './close-state'
import { ConnectionState } from './connection-state.interface'
import { Open } from './open-state'

export class Connecting implements ConnectionState {
	public get state(): string {
		return this.constructor.name
	}
	Close(connection: Connection): void {
		connection.status = new Close()
	}
	Connecting(connection: Connection): void {
		connection.status = new Connecting()
	}
	Open(connection: Connection): void {
		connection.status = new Open()
	}
	Inactive(_: Connection): void {
		throw new DomainError('Method not implemented.')
	}
}
