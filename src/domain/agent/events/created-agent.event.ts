import { DomainEvent } from '@/core/events/domain-event'
import { clock } from '@/core/helpers/dayjs'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Agent } from '../entities/agent.entity'

export class CreatedAgentEvent implements DomainEvent {
	public ocurredAt: Date
	public agent: Agent

	constructor(agent: Agent) {
		this.agent = agent
		this.ocurredAt = clock().toDate()
	}

	getAggregateId(): UniqueEntityID {
		return this.agent.id
	}
}
