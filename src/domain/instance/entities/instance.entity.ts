import { AggregateRoot } from '@/core/entities/aggregate-root'
import { clock } from '@/core/helpers/dayjs'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { WhatsappNumber } from '@/core/value-objects/whatsapp-number.value-object'

export interface InstanceProps {
	agentId: UniqueEntityID
	number?: WhatsappNumber | null
	session?: string
	status: string
	createdAt: Date
	updatedAt?: Date | null
}

export class Instance extends AggregateRoot<InstanceProps> {
	get agentId() {
		return this.props.agentId
	}

	set agentId(agentId: UniqueEntityID) {
		this.props.agentId = agentId
		this.touch()
	}

	get number() {
		return this.props.number ?? null
	}

	get status() {
		return this.props.status
	}

	set status(value: string) {
		this.props.status = value
		this.touch()
	}

	get createdAt() {
		return this.props.createdAt
	}

	get updatedAt() {
		return this.props.updatedAt
	}

	private touch() {
		this.props.updatedAt = clock().toDate()
	}
}
