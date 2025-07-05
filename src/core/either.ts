export class Left<L, R = never> {
	readonly value: L
	constructor(value: L) {
		this.value = value
	}
	isRight(): this is Right<L, R> {
		return false
	}
	isLeft(): this is Left<L, R> {
		return true
	}
}

export class Right<L = never, R = unknown> {
	readonly value: R
	constructor(value: R) {
		this.value = value
	}
	isRight(): this is Right<L, R> {
		return true
	}
	isLeft(): this is Left<L, R> {
		return false
	}
}

export type Either<L, R> = Left<L, R> | Right<L, R>

export const left = <L, R = never>(value: L): Either<L, R> => new Left(value)
export const right = <R, L = never>(value: R): Either<L, R> => new Right(value)
