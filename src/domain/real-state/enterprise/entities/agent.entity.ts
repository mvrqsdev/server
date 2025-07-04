import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AgentProps {
	name: string
	email: string
	password: string
	master: boolean
	isInRotation: boolean
	role: 'Admin' | 'Marketing' | 'Agent'
	status: 'Active' | 'Inactive'
	createdAt: Date
	updatedAt?: Date | null
}

export class Agent extends AggregateRoot<AgentProps> {
	get name() {
		return this.props.name
	}

	set name(name: string) {
		this.props.name = name
		this.touch()
	}

	get email() {
		return this.props.email
	}

	set email(email: string) {
		this.props.email = email
		this.touch()
	}

	get password() {
		return this.props.password
	}

	set password(password: string) {
		this.props.password = password
		this.touch()
	}

	get status() {
		return this.props.status
	}

	set status(status: 'Active' | 'Inactive') {
		this.props.status = status
		this.touch()
	}

	get role() {
		return this.props.role
	}

	set role(role: 'Admin' | 'Marketing' | 'Agent') {
		this.props.role = role
		this.touch()
	}

	public isMaster(): boolean {
		return this.props.master
	}

	public makeMaster() {
		this.props.master = true
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
		props: Optional<AgentProps, 'createdAt' | 'status' | 'role' | 'master'>,
		id?: UniqueEntityID,
	) {
		const agent = new Agent(
			{
				...props,
				status: props.status ?? 'Active',
				master: props.master ?? false,
				role: props.role ?? 'Agent',
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)

		return agent
	}
}
