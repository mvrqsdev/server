import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

type LeadStatus =
	| 'PreService'
	| 'Service'
	| 'Scheduling'
	| 'Visit'
	| 'Folder'
	| 'CreditAnalysis'
	| 'Proposal'
	| 'Contract'
	| 'Off'
	| 'Finished'

export interface LeadProps {
	contactId: UniqueEntityID
	agentId: UniqueEntityID
	converted: boolean
	status: LeadStatus
	value: number
	createdAt: Date
	updatedAt?: Date | null
}

export class Lead extends AggregateRoot<LeadProps> {
	get createdAt() {
		return this.props.createdAt
	}

	get updatedAt() {
		return this.props.updatedAt
	}

	get status() {
		return this.props.status
	}

	set status(status: LeadStatus) {
		this.props.status = status
		this.touch()
	}

	get agentId() {
		return this.props.agentId
	}

	set agentId(id: UniqueEntityID) {
		this.props.agentId = id
		this.touch()
	}

	get contactId() {
		return this.props.contactId
	}

	set contactId(id: UniqueEntityID) {
		this.props.contactId = id
		this.touch()
	}

	get converted() {
		return this.props.converted
	}

	set converted(value: boolean) {
		this.props.converted = value
		this.touch()
	}

	get value() {
		return this.props.value
	}

	set value(value: number) {
		this.props.value = value
		this.touch()
	}

	private touch() {
		this.props.updatedAt = new Date()
	}

	static create(
		props: Optional<LeadProps, 'createdAt' | 'value' | 'converted' | 'status'>,
		id?: UniqueEntityID,
	) {
		const lead = new Lead(
			{
				...props,
				value: props.value ?? 0,
				converted: props.converted ?? false,
				status: props.status ?? 'PreService',
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)

		return lead
	}
}
