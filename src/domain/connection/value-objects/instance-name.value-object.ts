export class InstanceName {
	public value: string

	private constructor(value: string) {
		this.value = value
	}

	static create(value: string) {
		return new InstanceName(value)
	}

	/**
	 * Receives a string and normalize it as a instancename.
	 *
	 * Example: "An example title" => "an-example-title"
	 *
	 * @param text {string}
	 */
	static createFromText(text: string): InstanceName {
		const instancenameText = text
			.normalize('NFKD')
			.toLowerCase()
			.trim()
			.replace(/\s+/g, '-')
			.replace(/[^\w-]+/g, '')
			.replace(/_/g, '-')
			.replace(/--+/g, '-')
			.replace(/-$/g, '')

		return new InstanceName(instancenameText)
	}
}
