import { v4 } from 'uuid'

export class InstanceName {
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

	equals(id: InstanceName) {
		return id.toValue() === this.value
	}
}
