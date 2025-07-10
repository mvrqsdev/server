export interface MessageConversationProps {
	data: {
		key: {
			remoteJid: string
			fromMe: boolean
			id: string
		}
		pushName: string
		status: string
		message: {
			conversation: string
		}
		messageType: 'conversation'
		messageTimestamp: number
		instanceId: string
		source: string
	}
}

export class MessageConversation implements MessageConversationProps {
	event: string
	instance: string
	data: MessageConversationProps['data']
	destination: string
	date_time: string
	sender: string
	server_url: string
	apikey: string

	constructor(props: MessageConversationProps) {
		Object.assign(this, props)
	}

	static fromJSON(json: string): MessageConversation {
		const message: MessageConversationProps = JSON.parse(json)
		return new MessageConversation(message)
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
