export interface MessageContactsArrayMessageProps {
	data: {
		key: {
			remoteJid: string
			fromMe: boolean
			id: string
		}
		pushName: string
		status: string
		message: {
			contactsArrayMessage: {
				displayName: string
				contacts: {
					displayName: string
					vcard: string
				}[]
			}
		}
		messageType: 'contactsArrayMessage'
		messageTimestamp: number
		instanceId: string
		source: string
	}
}

export class MessageContactsArrayMessage implements MessageContactsArrayMessageProps {
	event: string
	instance: string
	data: MessageContactsArrayMessageProps['data']
	destination: string
	date_time: string
	sender: string
	server_url: string
	apikey: string

	constructor(props: MessageContactsArrayMessageProps) {
		Object.assign(this, props)
	}

	static fromJSON(json: string): MessageContactsArrayMessage {
		const message: MessageContactsArrayMessageProps = JSON.parse(json)
		return new MessageContactsArrayMessage(message)
	}

	toString(): string {
		return JSON.stringify(
			{
				event: this.event,
				instance: this.instance,
				data: this.data,
				destination: this.destination,
				date_time: this.date_time,
				sender: this.sender,
				server_url: this.server_url,
				apikey: this.apikey,
			},
			null,
			2,
		)
	}
}
