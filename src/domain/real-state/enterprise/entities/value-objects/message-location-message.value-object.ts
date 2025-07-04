export interface MessageLocationMessageProps {
	data: {
		key: {
			remoteJid: string
			fromMe: boolean
			id: string
		}
		pushName: string
		status: string
		message: {
			locationMessage: {
				degreesLatitude: number
				degreesLongitude: number
				jpegThumbnail: string
			}
			mediaUrl: string
		}
		messageType: 'locationMessage'
		messageTimestamp: number
		instanceId: string
		source: string
	}
}

export class MessageLocationMessage implements MessageLocationMessageProps {
	event: string
	instance: string
	data: MessageLocationMessageProps['data']
	destination: string
	date_time: string
	sender: string
	server_url: string
	apikey: string

	constructor(props: MessageLocationMessageProps) {
		Object.assign(this, props)
	}

	static fromJSON(json: string): MessageLocationMessage {
		const message: MessageLocationMessageProps = JSON.parse(json)
		return new MessageLocationMessage(message)
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
