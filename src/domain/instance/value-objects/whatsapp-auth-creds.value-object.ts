import { AuthenticationCreds, BufferJSON } from '@whiskeysockets/baileys'
import { ValueObject } from '@/core/value-objects/value-object'

export interface WhatsAppAuthCredsProps {
	value: AuthenticationCreds
}

export class WhatsAppAuthCreds extends ValueObject<WhatsAppAuthCredsProps> {
	get value(): AuthenticationCreds {
		return this.props.value
	}

	public static create(value: AuthenticationCreds) {
		return new WhatsAppAuthCreds({ value })
	}

	public toJSON(): any {
		// serializa corretamente os buffers para JSON string
		return JSON.parse(JSON.stringify(this.props.value, BufferJSON.replacer))
	}

	public static fromJSON(value: any): WhatsAppAuthCreds {
		// desserializa buffers da string JSON para o objeto original
		const parsed = JSON.parse(JSON.stringify(value), BufferJSON.reviver)
		return WhatsAppAuthCreds.create(parsed as AuthenticationCreds)
	}
}
