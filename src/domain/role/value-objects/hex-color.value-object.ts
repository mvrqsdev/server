export class HexColor {
	private value: string
	private constructor(color: string) {
		this.value = HexColor.normalize(color)
	}

	public static create(color: string): HexColor {
		if (!HexColor.isValid(color)) {
			throw new Error(`Invalid Hex Color: "${color}"`)
		}

		return new HexColor(color)
	}

	public getValue(): string {
		return this.value
	}

	public equals(other: HexColor): boolean {
		return this.value.toLowerCase() === other.value.toLowerCase()
	}

	public toString(): string {
		return this.value
	}

	private static isValid(color: string): boolean {
		const hex = color.trim().replace(/^#/, '')
		return /^[0-9A-Fa-f]{3}$/.test(hex) || /^[0-9A-Fa-f]{6}$/.test(hex)
	}

	private static normalize(color: string): string {
		let hex = color.trim().replace(/^#/, '')

		// Converte #RGB para #RRGGBB
		if (hex.length === 3) {
			hex = hex
				.split('')
				.map((c) => c + c)
				.join('')
		}

		return `#${hex.toLowerCase()}`
	}
}
