export class DomainError extends Error {
	public readonly httpCode: number

	constructor(message: string, httpCode: number) {
		super(message)
		Object.setPrototypeOf(this, new.target.prototype)
		this.name = this.constructor.name
		this.httpCode = httpCode
	}
}
