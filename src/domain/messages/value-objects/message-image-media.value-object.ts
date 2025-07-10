export interface MessageImageMediaProps {
	data: {
		key: {
			remoteJid: string
			fromMe: boolean
			id: string
		}
		pushName: string
		status: string
		message: {
			imageMessage: {
				url: string
				mimetype: string
				caption?: string
				fileSha256: string
				fileLength: string
				height: number
				width: number
				mediaKey: string
				fileEncSha256: string
				directPath: string
				mediaKeyTimestamp: string
				jpegThumbnail: string
				firstScanSidecar: string
				firstScanLength: number
				scansSidecar: string
				scanLengths: number[]
				midQualityFileSha256: string
			}
			mediaUrl: string
		}
		messageType: 'imageMessage'
		messageTimestamp: number
		instanceId: string
		source: string
	}
}

export class MessageImageMedia implements MessageImageMediaProps {
	event: string
	instance: string
	data: MessageImageMediaProps['data']
	destination: string
	date_time: string
	sender: string
	server_url: string
	apikey: string

	constructor(props: MessageImageMediaProps) {
		Object.assign(this, props)
	}

	static fromJSON(json: string): MessageImageMedia {
		const message: MessageImageMediaProps = JSON.parse(json)
		return new MessageImageMedia(message)
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
