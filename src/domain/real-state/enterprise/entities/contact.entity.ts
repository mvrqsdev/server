import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { WhatsappNumber } from './value-objects/whatsapp-number.value-object'

export interface ContactProps {
	name: string
	whatsappNumber: WhatsappNumber
	email: string
	createdAt: Date
	updatedAt?: Date | null
}

export class Contact extends AggregateRoot<ContactProps> {
	get name() {
		return this.props.name
	}

	set name(name: string) {
		this.props.name = name
		this.touch()
	}

	get createdAt() {
		return this.props.createdAt
	}

	get updatedAt() {
		return this.props.updatedAt
	}

	private touch() {
		this.props.updatedAt = new Date()
	}

	static create(props: Optional<ContactProps, 'createdAt'>, id?: UniqueEntityID) {
		const contact = new Contact(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)

		return contact
	}
}
