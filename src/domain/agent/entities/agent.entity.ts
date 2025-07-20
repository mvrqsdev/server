import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { AgentStatus } from '../contracts/agent-status.contract'
import { InviteAgentEvent } from '../events/invite-agent-event'
import { AgentRoles } from './agent-roles.watched-list'

export interface AgentProps {
	name: string
	email: string
	password: string
	master: boolean
	isInRotation: boolean
	roles: AgentRoles
	status: AgentStatus
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

	set status(newStatus: AgentStatus) {
		this.props.status = newStatus
		this.touch()
	}

	public inactiveAgent() {
		this.status.inactiveAgent(this)
	}

	public activeAgent() {
		this.status.activeAgent(this)
	}

	public inviteAgent() {
		this.status.inviteAgent(this)
		this.addDomainEvent(new InviteAgentEvent(this))
	}

	get roles() {
		return this.props.roles
	}

	set roles(roles: AgentRoles) {
		this.props.roles = roles
		this.touch()
	}

	get isInRotation() {
		return this.props.isInRotation
	}

	set isInRotation(value: boolean) {
		this.props.isInRotation = value
		this.touch()
	}

	get master() {
		return this.props.master
	}

	set master(value: boolean) {
		this.props.master = value
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
		props: Optional<AgentProps, 'createdAt' | 'roles' | 'master' | 'isInRotation'>,
		id?: UniqueEntityID,
	) {
		const agent = new Agent(
			{
				...props,
				isInRotation: props.isInRotation ?? false,
				master: props.master ?? false,
				roles: props.roles ?? new AgentRoles(),
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)

		return agent
	}
}
