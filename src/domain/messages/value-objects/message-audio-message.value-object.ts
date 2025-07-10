export interface MessageAudioMessageProps {
	data: {
		key: {
			remoteJid: string
			fromMe: boolean
			id: string
		}
		pushName: string
		status: string
		message: {
			audioMessage: {
				url: string
				mimetype: string
				fileSha256: string
				fileLength: string
				seconds: number
				ptt: boolean
				mediaKey: string
				fileEncSha256: string
				directPath: string
				mediaKeyTimestamp: string
				streamingSidecar: string
				waveForm: string
			}
			mediaUrl: string
		}
		messageType: 'audioMessage'
		messageTimestamp: number
		instanceId: string
		source: string
	}
}

export class MessageAudioMessage implements MessageAudioMessageProps {
	event: string
	instance: string
	data: MessageAudioMessageProps['data']
	destination: string
	date_time: string
	sender: string
	server_url: string
	apikey: string

	constructor(props: MessageAudioMessageProps) {
		Object.assign(this, props)
	}

	static fromJSON(json: string): MessageAudioMessage {
		const message: MessageAudioMessageProps = JSON.parse(json)
		return new MessageAudioMessage(message)
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
