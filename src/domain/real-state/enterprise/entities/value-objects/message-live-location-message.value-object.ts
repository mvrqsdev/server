export interface MessageLiveLocationMessageProps {
	data: {
		key: {
			remoteJid: string
			fromMe: boolean
			id: string
		}
		pushName: string
		status: string
		message: {
			liveLocationMessage: {
				degreesLatitude: number
				degreesLongitude: number
				sequenceNumber: string
				jpegThumbnail: string
			}
			mediaUrl: string
		}
		messageType: 'liveLocationMessage'
		messageTimestamp: number
		instanceId: string
		source: string
	}
}

export class MessageLiveLocationMessage implements MessageLiveLocationMessageProps {
	event: string
	instance: string
	data: MessageLiveLocationMessageProps['data']
	destination: string
	date_time: string
	sender: string
	server_url: string
	apikey: string

	constructor(props: MessageLiveLocationMessageProps) {
		Object.assign(this, props)
	}

	static fromJSON(json: string): MessageLiveLocationMessage {
		const message: MessageLiveLocationMessageProps = JSON.parse(json)
		return new MessageLiveLocationMessage(message)
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
