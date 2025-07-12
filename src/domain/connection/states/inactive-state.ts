import { DomainError } from '@/core/errors/errors/domain.error'
import { Connection } from '../entities/connection.entity'
import { Close } from './close-state'
import { ConnectionState } from './connection-state.interface'

export class Inactive implements ConnectionState {
	public get state(): string {
		return this.constructor.name
	}
	Close(connection: Connection): void {
		connection.status = new Close()
	}
	Connecting(_: Connection): void {
		throw new DomainError('')
	}
	Open(_: Connection): void {
		throw new DomainError('')
	}
	Inactive(connection: Connection): void {
		connection.status = new Inactive()
	}
}
