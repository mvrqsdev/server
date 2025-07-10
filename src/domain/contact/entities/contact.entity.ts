import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { WhatsappNumber } from '@/core/value-objects/whatsapp-number.value-object'
import { ContactLeadList } from './contact-lead.watched-list'

export interface ContactProps {
	name: string
	whatsappNumber: WhatsappNumber
	email: string
	leads: ContactLeadList
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

	get email() {
		return this.props.email
	}

	set email(email: string) {
		this.props.email = email
		this.touch()
	}

	get leads() {
		return this.props.leads
	}

	set leads(leads: ContactLeadList) {
		this.props.leads = leads
		this.touch()
	}

	get whatsappNumber() {
		return this.props.whatsappNumber
	}

	set whatsappNumber(whatsappNumber: WhatsappNumber) {
		this.props.whatsappNumber = whatsappNumber
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

	static create(
		props: Optional<ContactProps, 'leads' | 'createdAt'>,
		id?: UniqueEntityID,
	) {
		const contact = new Contact(
			{
				...props,
				leads: props.leads ?? new ContactLeadList(),
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)

		return contact
	}
}
