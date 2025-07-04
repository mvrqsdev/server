import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { MessageAudioMessage } from './value-objects/message-audio-message.value-object'
import { MessageContactMessage } from './value-objects/message-contact-message.value-object'
import { MessageContactsArrayMessage } from './value-objects/message-contacts-array-message.value-object'
import { MessageConversation } from './value-objects/message-conversation.value-object'
import { MessageDocumentMessage } from './value-objects/message-document-message.value-object'
import { MessageImageMedia } from './value-objects/message-image-media.value-object'
import { MessageLiveLocationMessage } from './value-objects/message-live-location-message.value-object'
import { MessageLocationMessage } from './value-objects/message-location-message.value-object'

type MessageTypeMap = {
	audioMessage: MessageAudioMessage
	contactMessage: MessageContactMessage
	contactsArrayMessage: MessageContactsArrayMessage
	conversation: MessageConversation
	documentMessage: MessageDocumentMessage
	imageMessage: MessageImageMedia
	liveLocationMessage: MessageLiveLocationMessage
	locationMessage: MessageLocationMessage
}

// Criação da união discriminada
type DiscriminatedMessage = {
	[K in keyof MessageTypeMap]: {
		messageType: K
		content: MessageTypeMap[K]
	}
}[keyof MessageTypeMap]

// Tipos base, exceto os discriminados
type BaseMessageProps = {
	leadId: UniqueEntityID
	agentId: UniqueEntityID
	fromMe: boolean
	createdAt: Date
}

// Propriedades finais da entidade
export type MessageProps = BaseMessageProps & DiscriminatedMessage

export class Message extends AggregateRoot<MessageProps> {
	get leadId() {
		return this.props.leadId
	}

	get agentId() {
		return this.props.agentId
	}

	get content() {
		return this.props.content
	}

	get messageType() {
		return this.props.messageType
	}

	get fromMe() {
		return this.props.fromMe
	}

	get createdAt() {
		return this.props.createdAt
	}

	static create<
		T extends DiscriminatedMessage & Partial<Pick<BaseMessageProps, 'createdAt'>>,
	>(props: T & Omit<BaseMessageProps, 'createdAt'>, id?: UniqueEntityID): Message {
		const message = new Message(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)

		return message
	}

	// Métodos type guards para acesso seguro ao content
	isAudioMessage(): this is Message & {
		props: { content: MessageAudioMessage; messageType: 'audioMessage' }
	} {
		return this.props.messageType === 'audioMessage'
	}

	isContactMessage(): this is Message & {
		props: { content: MessageContactMessage; messageType: 'contactMessage' }
	} {
		return this.props.messageType === 'contactMessage'
	}

	isContactsArrayMessage(): this is Message & {
		props: { content: MessageContactsArrayMessage; messageType: 'contactsArrayMessage' }
	} {
		return this.props.messageType === 'contactsArrayMessage'
	}

	isConversation(): this is Message & {
		props: { content: MessageConversation; messageType: 'conversation' }
	} {
		return this.props.messageType === 'conversation'
	}

	isDocumentMessage(): this is Message & {
		props: { content: MessageDocumentMessage; messageType: 'documentMessage' }
	} {
		return this.props.messageType === 'documentMessage'
	}

	isImageMessage(): this is Message & {
		props: { content: MessageImageMedia; messageType: 'imageMessage' }
	} {
		return this.props.messageType === 'imageMessage'
	}

	isLiveLocationMessage(): this is Message & {
		props: { content: MessageLiveLocationMessage; messageType: 'liveLocationMessage' }
	} {
		return this.props.messageType === 'liveLocationMessage'
	}

	isLocationMessage(): this is Message & {
		props: { content: MessageLocationMessage; messageType: 'locationMessage' }
	} {
		return this.props.messageType === 'locationMessage'
	}
}
