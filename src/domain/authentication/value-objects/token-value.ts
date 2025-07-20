import { v4 } from 'uuid'
import { AuthenticationStrategy } from '../entities/authentication.entity'

export class TokenValue {
	private value: string

	toString() {
		return this.value
	}

	toValue() {
		return this.value
	}

	constructor(value: string) {
		this.value = value
	}

	static create(type: AuthenticationStrategy): TokenValue {
		const value = type === 'ApiKey' ? v4() : `sk_${v4()}`
		const tokenValue = new TokenValue(value)
		return tokenValue
	}

	equals(id: TokenValue) {
		return id.toValue() === this.value
	}
}
