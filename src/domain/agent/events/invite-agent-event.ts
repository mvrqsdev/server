import { DomainEvent } from '@/core/events/domain-event'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Agent } from '../entities/agent.entity'

export class InviteAgentEvent implements DomainEvent {
	public ocurredAt: Date
	public agent: Agent

	constructor(agent: Agent) {
		this.agent = agent
		this.ocurredAt = new Date()
	}

	getAggregateId(): UniqueEntityID {
		return this.agent.id
	}
}
