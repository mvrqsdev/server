import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { LeadState } from '../states/lead-state.interface'
import { PreServiceState } from '../states/pre-service-state'
import { LeadScheduling } from './lead-scheduling.watched-list'

export interface LeadProps {
	contactId: UniqueEntityID
	agentId: UniqueEntityID
	schedulings: LeadScheduling
	converted: boolean
	status: LeadState
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

	set status(status: LeadState) {
		const newStatus = this.status.changeStatus(this, status)
		this.props.status = newStatus
		this.touch()
	}

	get schedulings() {
		return this.props.schedulings
	}

	set schedulings(schedulings: LeadScheduling) {
		this.props.schedulings = schedulings
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

	verifyLeadToNewAgent(): boolean {
		return this.status.needToChangeAgent(this)
	}

	private touch() {
		this.props.updatedAt = new Date()
	}

	static create(
		props: Optional<
			LeadProps,
			'createdAt' | 'value' | 'converted' | 'status' | 'schedulings'
		>,
		id?: UniqueEntityID,
	) {
		const lead = new Lead(
			{
				...props,
				schedulings: props.schedulings ?? new LeadScheduling(),
				value: props.value ?? 0,
				converted: props.converted ?? false,
				status: props.status ?? new PreServiceState(),
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)

		return lead
	}
}
