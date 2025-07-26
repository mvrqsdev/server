import { AggregateRoot } from '@/core/entities/aggregate-root'
import { clock } from '@/core/helpers/dayjs'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'

export interface IAMessageProps {
	leadId: UniqueEntityID
	contactId: UniqueEntityID
	content?: string | null
	mediaUrl?: string | null
	mediaKey?: string | null
	messageType: string
	fromBot: boolean
	sessionId: string
	createdAt: Date
	updatedAt?: Date | null
}

export class IAMessage extends AggregateRoot<IAMessageProps> {
	get leadId() {
		return this.props.leadId
	}

	get contactId() {
		return this.props.contactId
	}

	get content() {
		return this.props.content ?? null
	}

	set content(content: string | null) {
		this.props.content = content
		this.touch()
	}

	get mediaUrl() {
		return this.props.mediaUrl ?? null
	}

	set mediaUrl(mediaUrl: string | null) {
		this.props.mediaUrl = mediaUrl
		this.touch()
	}

	get mediaKey() {
		return this.props.mediaKey ?? null
	}

	set mediaKey(mediaKey: string | null) {
		this.props.mediaKey = mediaKey
		this.touch()
	}

	get messageType() {
		return this.props.messageType
	}

	get fromBot() {
		return this.props.fromBot
	}

	get sessionId() {
		return this.props.sessionId
	}

	get createdAt() {
		return this.props.createdAt
	}

	get updatedAt() {
		return this.props.updatedAt
	}

	private touch() {
		this.props.updatedAt = clock().toDate()
	}

	static create(
		props: Optional<IAMessageProps, 'content' | 'mediaUrl' | 'mediaKey' | 'createdAt'>,
		id?: UniqueEntityID,
	) {
		const iaMessage = new IAMessage(
			{
				...props,
				content: props.content ?? null,
				mediaKey: props.mediaKey ?? null,
				mediaUrl: props.mediaUrl ?? null,
				createdAt: props.createdAt ?? clock().toDate(),
			},
			id,
		)
		return iaMessage
	}
}
