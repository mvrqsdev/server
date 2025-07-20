import { AggregateRoot } from '@/core/entities/aggregate-root'
import { clock } from '@/core/helpers/dayjs'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { TokenValue } from '../value-objects/token-value'

export type AuthenticationStrategy = 'ApiKey' | 'Session'
export interface AuthenticationProps {
	token: TokenValue
	strategy: AuthenticationStrategy
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
		this.props.updatedAt = clock().toDate()
	}

	static create(
		props: Optional<AuthenticationProps, 'createdAt' | 'token'>,
		id?: UniqueEntityID,
	) {
		const authentication = new Authentication(
			{
				...props,
				token: props.token ?? TokenValue.create(props.strategy),
				createdAt: props.createdAt ?? clock().toDate(),
			},
			id,
		)

		return authentication
	}
}
