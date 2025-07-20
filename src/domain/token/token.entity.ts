import { AggregateRoot } from '@/core/entities/aggregate-root'
import { clock } from '@/core/helpers/dayjs'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { TokenValue } from './value-objects/token-value.value-object'

export type TokenType = 'Invite' | 'PasswordRecovery' | 'EmailVerification'

interface TokenProps {
	token: TokenValue
	type: TokenType
	agentId: UniqueEntityID
	expiresAt: Date
	usedAt?: Date | null
	createdAt: Date
}

export class Token extends AggregateRoot<TokenProps> {
	get token() {
		return this.props.token
	}

	get type() {
		return this.props.type
	}

	get agentId() {
		return this.props.agentId
	}

	get expiresAt() {
		return this.props.expiresAt
	}

	get usedAt() {
		return this.props.usedAt
	}

	get createdAt() {
		return this.props.createdAt
	}

	public isExpired(): boolean {
		return clock().toDate() > this.props.expiresAt
	}

	public isUsed(): boolean {
		return !!this.props.usedAt
	}

	public markAsUsed() {
		if (this.isUsed()) {
		}
		this.props.usedAt = clock().toDate()
	}

	static create(
		props: Optional<TokenProps, 'createdAt' | 'usedAt'>,
		id?: UniqueEntityID,
	): Token {
		const token = new Token(
			{
				...props,
				token: props.token ?? new TokenValue(),
				usedAt: props.usedAt ?? null,
				createdAt: props.createdAt ?? clock().toDate(),
			},
			id,
		)

		return token
	}
}
