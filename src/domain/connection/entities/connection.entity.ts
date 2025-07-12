import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { WhatsappNumber } from '../../../core/value-objects/whatsapp-number.value-object'
import { Close } from '../states/close-state'
import { ConnectionState } from '../states/connection-state.interface'
import { ConnectionToken } from '../value-objects/connection-token.value-object'
import { InstanceName } from '../value-objects/instance-name.value-object'
import { InstanceId } from '../value-objects/instanceId.value-object'

export interface ConnectionProps {
	name: InstanceName
	number: WhatsappNumber
	instanceId: InstanceId
	status: ConnectionState
	token: ConnectionToken
	agentId: UniqueEntityID
	principal: boolean
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

	get number() {
		return this.props.number
	}

	set number(number: WhatsappNumber) {
		this.props.number = number
		this.touch()
	}

	get instanceId() {
		return this.props.instanceId
	}

	get status() {
		return this.props.status
	}

	set status(status: ConnectionState) {
		this.props.status = status
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

	get principal() {
		return this.props.principal
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

	public Close() {
		return this.status.Close(this)
	}
	public Connecting() {
		return this.status.Connecting(this)
	}
	public Open() {
		return this.status.Open(this)
	}
	public Inactive() {
		return this.status.Inactive(this)
	}

	static create(
		props: Optional<ConnectionProps, 'createdAt' | 'status' | 'principal'>,
		id?: UniqueEntityID,
	) {
		const connection = new Connection(
			{
				...props,
				principal: props.principal ?? false,
				status: props.status ?? new Close(),
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)

		return connection
	}
}
