import { AggregateRoot } from '@/core/entities/aggregate-root'
import { clock } from '@/core/helpers/dayjs'
import { Optional } from '@/core/types/optional'
import { Email } from '@/core/value-objects/email.value-object'
import { Name } from '@/core/value-objects/name.value-object'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Role } from '@/domain/role/entities/role.entity'
import { AgentStatus } from '../contracts/agent-status.contract'
import { AlterAgentEmailEvent } from '../events/alter-agent-email.event'
import { AlterAgentStatusEvent } from '../events/alter-agent-status.event'
import { CreatedAgentEvent } from '../events/created-agent.event'
import { Inactive } from '../states/inactive-agent-status'
import { AgentRoles } from './agent-roles.watched-list'

export interface AgentProps {
	name: Name
	email: Email
	password: string
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

	set name(name: Name) {
		this.props.name = name
		this.touch()
	}

	get email() {
		return this.props.email
	}

	set email(email: Email) {
		const oldEmail = this.props.email
		this.props.email = email
		if (oldEmail !== email) {
			this.addDomainEvent(new AlterAgentEmailEvent(this))
		}
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
		const oldStatus = this.props.status
		this.props.status = newStatus
		if (oldStatus.getName() !== newStatus.getName()) {
			this.addDomainEvent(new AlterAgentStatusEvent(this))
		}
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
	}

	public getNewRoles() {
		return this.props.roles.getNewItems()
	}

	public getRemovedRoles() {
		return this.props.roles.getRemovedItems()
	}

	public getUpdatedRoles() {
		return this.props.roles.getUpdatedItems()
	}

	public addRole(role: Role) {
		if (this.props.roles.exists(role)) return

		this.props.roles.add(role)
		this.touch()
	}

	public removeRole(role: Role) {
		if (!this.props.roles.exists(role)) return

		this.props.roles.remove(role)
		this.touch()
	}

	get roles() {
		return this.props.roles
	}

	get isInRotation() {
		return this.props.isInRotation
	}

	set isInRotation(value: boolean) {
		this.props.isInRotation = value
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

	static create(
		props: Optional<AgentProps, 'createdAt' | 'roles' | 'isInRotation' | 'status'>,
		id?: UniqueEntityID,
	) {
		const agent = new Agent(
			{
				...props,
				status: props.status ?? new Inactive(),
				isInRotation: props.isInRotation ?? false,
				roles: props.roles ?? new AgentRoles(),
				createdAt: props.createdAt ?? clock().toDate(),
			},
			id,
		)

		const isNewAgent = !id

		if (isNewAgent) {
			agent.addDomainEvent(new CreatedAgentEvent(agent))
		}

		return agent
	}
}
