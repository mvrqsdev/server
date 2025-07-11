import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { ValueObject } from '@/core/value-objects/value-object'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { Contact } from '@/domain/contact/entities/contact.entity'
import { Scheduling } from '@/domain/scheduling/entities/scheduling.entity'
import { LeadState } from '../states/lead-state.interface'

export interface LeadDetailsProps {
	leadId: UniqueEntityID
	contactId: UniqueEntityID
	contact: Contact
	agentId: UniqueEntityID
	agent: Agent
	schedulings: Scheduling[]
	converted: boolean
	status: LeadState
	value: number
	createdAt: Date
	updatedAt?: Date | null
}

export class LeadDetails extends ValueObject<LeadDetailsProps> {
	get leadId() {
		return this.props.leadId
	}
	get contactId() {
		return this.props.contactId
	}

	get contact() {
		return this.props.contact
	}

	get agentId() {
		return this.props.agentId
	}

	get agent() {
		return this.props.agent
	}

	get schedulings() {
		return this.props.schedulings
	}

	get converted() {
		return this.props.converted
	}

	get status() {
		return this.props.status
	}

	get value() {
		return this.props.value
	}

	get createdAt() {
		return this.props.createdAt
	}

	get updatedAt() {
		return this.props.updatedAt
	}

	static create(props: LeadDetailsProps) {
		return new LeadDetails(props)
	}
}
