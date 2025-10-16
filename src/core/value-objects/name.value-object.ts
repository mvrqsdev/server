export class Name {
	private readonly valor: string

	constructor(name: string) {
		this.valor = this.formatName(name)
	}

	private formatName(name: string): string {
		if (!name || name.trim().length === 0) {
			throw new Error('Nome não pode ser vazio')
		}

		const parts = name.trim().split(/\s+/)

		// Formata cada parte do name
		const formatedParts = parts.map((part) => {
			return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
		})

		return formatedParts.join(' ')
	}

	getValue(): string {
		return this.valor
	}

	toString(): string {
		return this.valor
	}

	equals(otherName: Name): boolean {
		return this.valor === otherName.valor
	}
}
