import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { ValueObject } from '@/core/value-objects/value-object'
import { Connection } from '@/domain/connection/entities/connection.entity'

export interface AgentDetailsProps {
	agentId: UniqueEntityID
	name: string
	email: string
	master: boolean
	isInRotation: boolean
	role: 'Admin' | 'Marketing' | 'Agent'
	status: 'Active' | 'Inactive'
	createdAt: Date
	updatedAt?: Date | null
	connections: Connection[]
}

export class AgentDetails extends ValueObject<AgentDetailsProps> {
	get agentId() {
		return this.props.agentId
	}

	get name() {
		return this.props.name
	}

	get email() {
		return this.props.email
	}

	get master() {
		return this.props.master
	}

	get isInRotation() {
		return this.props.isInRotation
	}

	get role() {
		return this.props.role
	}

	get status() {
		return this.props.status
	}

	get createdAt() {
		return this.props.createdAt
	}

	get updatedAt() {
		return this.props.updatedAt
	}

	get connections() {
		return this.props.connections
	}

	static create(props: AgentDetailsProps) {
		return new AgentDetails(props)
	}
}
