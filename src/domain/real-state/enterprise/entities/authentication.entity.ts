import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AuthenticationProps {
	token: string
	strategy: 'ApiKey' | 'Session'
	agentId: UniqueEntityID
	ip?: string | null
	userAgent?: string | null
	expiresAt?: Date | null
	revokedAt?: Date | null
	createdAt: Date
	updatedAt?: Date | null
}

export class Authentication extends AggregateRoot<AuthenticationProps> {
	get token() {
		return this.props.token
	}

	get strategy() {
		return this.props.strategy
	}

	get agentId() {
		return this.props.agentId
	}

	get ip() {
		return this.props.ip
	}

	get userAgent() {
		return this.props.userAgent
	}

	get expiresAt() {
		return this.props.expiresAt ?? null
	}

	set expiresAt(date: Date | null) {
		this.props.expiresAt = date
		this.touch()
	}

	get revokedAt() {
		return this.props.revokedAt ?? null
	}

	set revokedAt(date: Date | null) {
		this.props.revokedAt = date
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

	static create(props: Optional<AuthenticationProps, 'createdAt'>, id?: UniqueEntityID) {
		const authentication = new Authentication(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)

		return authentication
	}
}
