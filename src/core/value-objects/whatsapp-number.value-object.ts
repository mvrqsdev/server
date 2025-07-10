export class WhatsappNumber {
	private value: string

	private constructor(value: string) {
		this.value = value
	}

	static create(value: string): WhatsappNumber {
		return new WhatsappNumber(value)
	}

	private static formatMXOrARNumber(jid: string): string {
		const countryCode = jid.substring(0, 2)

		if (Number(countryCode) === 52 || Number(countryCode) === 54) {
			if (jid.length === 13) {
				const number = countryCode + jid.substring(3)
				return number
			}

			return jid
		}
		return jid
	}

	// Check if the number is br
	private static formatBRNumber(jid: string) {
		const regexp = new RegExp(/^(\d{2})(\d{2})\d{1}(\d{8})$/)
		if (regexp.test(jid)) {
			const match = regexp.exec(jid)
			if (match && match[1] === '55') {
				const joker = Number.parseInt(match[3][0])
				const ddd = Number.parseInt(match[2])
				if (joker < 7 || ddd < 31) {
					return match[0]
				}
				return match[1] + match[2] + match[3]
			}
			return jid
		}
		return jid
	}

	static createFromText(number: string): WhatsappNumber {
		number = number.replace(/:\d+/, '')

		if (
			number.includes('@g.us') ||
			number.includes('@s.whatsapp.net') ||
			number.includes('@lid')
		) {
			return new WhatsappNumber(number)
		}

		if (number.includes('@broadcast')) {
			return new WhatsappNumber(number)
		}

		number = number
			?.replace(/\s/g, '')
			.replace(/\+/g, '')
			.replace(/\(/g, '')
			.replace(/\)/g, '')
			.split(':')[0]
			.split('@')[0]

		if (number.includes('-') && number.length >= 24) {
			number = number.replace(/[^\d-]/g, '')
			return new WhatsappNumber(`${number}@g.us`)
		}

		number = number.replace(/\D/g, '')

		if (number.length >= 18) {
			number = number.replace(/[^\d-]/g, '')
			return new WhatsappNumber(`${number}@g.us`)
		}

		number = WhatsappNumber.formatMXOrARNumber(number)

		number = WhatsappNumber.formatBRNumber(number)

		return new WhatsappNumber(`${number}@s.whatsapp.net`)
	}

	get whatsappId() {
		return WhatsappNumber.createFromText(this.value).value
	}

	get number() {
		return this.value.split('@')[0]
	}
}
