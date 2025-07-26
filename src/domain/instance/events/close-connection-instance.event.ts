import { DomainEvent } from '@/core/events/domain-event'
import { clock } from '@/core/helpers/dayjs'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Instance } from '../entities/instance.entity'

export class CloseConnectionInstanceEvent implements DomainEvent {
	ocurredAt: Date
	public instance: Instance
	getAggregateId(): UniqueEntityID {
		return this.instance.id
	}

	constructor(instance: Instance) {
		this.instance = instance
		this.ocurredAt = clock().toDate()
	}
}
