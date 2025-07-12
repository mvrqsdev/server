import { DomainError } from '@/core/errors/errors/domain.error'
import { Connection } from '../entities/connection.entity'
import { Connecting } from './connecting-state'
import { ConnectionState } from './connection-state.interface'
import { Inactive } from './inactive-state'

export class Close implements ConnectionState {
	public get state(): string {
		return this.constructor.name
	}
	Close(connection: Connection): void {
		connection.status = new Close()
	}
	Connecting(connection: Connection): void {
		connection.status = new Connecting()
	}
	Open(_: Connection): void {
		throw new DomainError('Method not implemented.')
	}
	Inactive(connection: Connection): void {
		connection.status = new Inactive()
	}
}
