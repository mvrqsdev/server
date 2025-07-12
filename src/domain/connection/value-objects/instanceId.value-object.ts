import { v4 } from 'uuid'

export class InstanceId {
	private value: string

	toString() {
		return this.value
	}

	toValue() {
		return this.value
	}

	constructor(value?: string) {
		this.value = value ?? v4()
	}

	equals(id: InstanceId) {
		return id.toValue() === this.value
	}
}
