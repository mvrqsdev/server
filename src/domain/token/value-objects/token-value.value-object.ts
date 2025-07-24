import { createHash, randomBytes } from 'node:crypto'

export class TokenValue {
	private readonly plainToken: string
	private readonly hashedToken: string

	// Reidrata a partir do banco (apenas hash, plainToken fica vazio)
	constructor(hashedToken: string) {
		this.hashedToken = hashedToken
		this.plainToken = ''
	}

	// Geração de novo token (plain + hash)
	static create(): TokenValue {
		const plainToken = randomBytes(32).toString('hex')
		const hashedToken = TokenValue.hashFrom(plainToken)
		return new TokenValue(hashedToken)._withPlain(plainToken)
	}

	// Aplica hash SHA-256
	static hashFrom(plain: string): string {
		return createHash('sha256').update(plain).digest('hex')
	}

	// Setter interno para manter imutabilidade pública
	private _withPlain(plain: string): this {
		;(this as any).plainToken = plain
		return this
	}

	// Retorna o token em texto plano (ou string vazia se reconstruído)
	toPlain(): string {
		return this.plainToken
	}

	// Retorna o hash do token
	toHash(): string {
		return this.hashedToken
	}

	// Compara um token externo (texto plano) com esse VO
	equalsPlainToken(plain: string): boolean {
		return TokenValue.hashFrom(plain) === this.hashedToken
	}

	toString(): string {
		return this.toHash()
	}

	toValue(): string {
		return this.toHash()
	}

	equals(other: TokenValue): boolean {
		return this.hashedToken === other.toHash()
	}
}
