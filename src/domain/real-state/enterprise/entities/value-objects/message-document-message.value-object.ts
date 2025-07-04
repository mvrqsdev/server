export interface MessageDocumentMessageProps {
	data: {
		key: {
			remoteJid: string
			fromMe: boolean
			id: string
		}
		pushName: string
		status: string
		message: {
			documentMessage: {
				url: string
				mimetype: string
				title: string
				fileSha256: string
				fileLength: string
				pageCount: number
				mediaKey: string
				fileName: string
				fileEncSha256: string
				directPath: string
				mediaKeyTimestamp: string
				contactVcard: boolean
				jpegThumbnail: string
			}
			mediaUrl: string
		}
		messageType: 'documentMessage'
		messageTimestamp: number
		instanceId: string
		source: string
	}
}

export class MessageDocumentMessage implements MessageDocumentMessageProps {
	event: string
	instance: string
	data: MessageDocumentMessageProps['data']
	destination: string
	date_time: string
	sender: string
	server_url: string
	apikey: string

	constructor(props: MessageDocumentMessageProps) {
		Object.assign(this, props)
	}

	static fromJSON(json: string): MessageDocumentMessage {
		const message: MessageDocumentMessageProps = JSON.parse(json)
		return new MessageDocumentMessage(message)
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
