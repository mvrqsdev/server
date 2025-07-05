import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { InstanceName } from './value-objects/instance-name.value-object'
import { WhatsappNumber } from './value-objects/whatsapp-number.value-object'

export interface ConnectionProps {
	name: InstanceName
	whatsappNumber: WhatsappNumber
	token: UniqueEntityID
	agentId: UniqueEntityID
	status: 'Active' | 'Inactive'
	createdAt: Date
	updatedAt?: Date | null
}

export class Connection extends AggregateRoot<ConnectionProps> {
	get name() {
		return this.props.name
	}

	set name(name: InstanceName) {
		this.props.name = name
		this.touch()
	}

	get whatsappNumber() {
		return this.props.whatsappNumber
	}

	set whatsappNumber(whatsappNumber: WhatsappNumber) {
		this.props.whatsappNumber = whatsappNumber
		this.touch()
	}

	get token() {
		return this.props.token
	}

	get agentId() {
		return this.props.agentId
	}

	set agentId(agentId: UniqueEntityID) {
		this.props.agentId = agentId
		this.touch()
	}

	get status() {
		return this.props.status
	}

	set status(status: 'Active' | 'Inactive') {
		this.props.status = status
		this.touch()
	}

	get createdAt() {
		return this.props.createdAt
	}

	get updatedAt() {
		return this.props.updatedAt
	}

	private touch() {
		this.props.updatedAt = new Date()
	}

	static create(
		props: Optional<ConnectionProps, 'createdAt' | 'status'>,
		id?: UniqueEntityID,
	) {
		const connection = new Connection(
			{
				...props,
				status: props.status ?? 'Active',
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)

		return connection
	}
}
