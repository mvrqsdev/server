import { AggregateRoot } from '@/core/entities/aggregate-root'
import { clock } from '@/core/helpers/dayjs'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Scheduled } from '../states/scheduled-status'
import { SchedulingState } from '../states/scheduling-state.interface'

export interface SchedulingProps {
	agentId: UniqueEntityID
	leadId: UniqueEntityID
	status: SchedulingState
	address: string
	scheduled: Date
	createdAt: Date
	updatedAt?: Date | null
}

export class Scheduling extends AggregateRoot<SchedulingProps> {
	get createdAt() {
		return this.props.createdAt
	}

	get updatedAt() {
		return this.props.updatedAt
	}

	get agentId() {
		return this.props.agentId
	}

	set agentId(id: UniqueEntityID) {
		this.props.agentId = id
		this.touch()
	}

	get leadId() {
		return this.props.leadId
	}

	set leadId(id: UniqueEntityID) {
		this.props.leadId = id
		this.touch()
	}

	get status() {
		return this.props.status
	}

	set status(status: SchedulingState) {
		this.status[status.state]()
		this.touch()
	}

	get address() {
		return this.props.address
	}

	set address(address: string) {
		this.props.address = address
		this.touch()
	}

	get scheduled() {
		return this.props.scheduled
	}

	set scheduled(date: Date) {
		this.props.scheduled = date
		this.touch()
	}

	private touch() {
		this.props.updatedAt = clock().toDate()
	}

	static create(
		props: Optional<SchedulingProps, 'createdAt' | 'status'>,
		id?: UniqueEntityID,
	) {
		const scheduling = new Scheduling(
			{
				...props,
				status: props.status ?? new Scheduled(),
				createdAt: props.createdAt ?? clock().toDate(),
			},
			id,
		)

		return scheduling
	}
}
