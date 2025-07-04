export interface MessageContactMessageProps {
	data: {
		key: {
			remoteJid: string
			fromMe: boolean
			id: string
		}
		pushName: string
		status: string
		message: {
			contactMessage: {
				displayName: string
				vcard: string
			}
		}
		messageType: 'contactMessage'
		messageTimestamp: number
		instanceId: string
		source: string
	}
}

export class MessageContactMessage implements MessageContactMessageProps {
	event: string
	instance: string
	data: MessageContactMessageProps['data']
	destination: string
	date_time: string
	sender: string
	server_url: string
	apikey: string

	constructor(props: MessageContactMessageProps) {
		Object.assign(this, props)
	}

	static fromJSON(json: string): MessageContactMessage {
		const message: MessageContactMessageProps = JSON.parse(json)
		return new MessageContactMessage(message)
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
