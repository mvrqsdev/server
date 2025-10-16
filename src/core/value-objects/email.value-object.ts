export class Email {
	private readonly _value: string

	constructor(email: string) {
		if (!Email.isValid(email)) {
			// deve lançar o erro
		}
		this._value = email.toLowerCase().trim()
	}

	get value(): string {
		return this._value
	}

	private static isValid(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}
}
