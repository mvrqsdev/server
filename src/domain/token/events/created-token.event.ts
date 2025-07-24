import { DomainEvent } from '@/core/events/domain-event'
import { clock } from '@/core/helpers/dayjs'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Token } from '../entities/token.entity'

export class CreatedTokenEvent implements DomainEvent {
	public ocurredAt: Date
	public token: Token

	constructor(token: Token) {
		this.token = token
		this.ocurredAt = clock().toDate()
	}

	getAggregateId(): UniqueEntityID {
		return this.token.id
	}
}
