import { Contact } from '@/domain/contact/entities/contact.entity'

export class ContactPresenter {
	static toHTTP(contact: Contact) {
		return {
			id: contact.id.toString(),
			name: contact.name,
			whatsappNumber: contact.whatsappNumber.number,
			email: contact.email,
			createdAt: contact.createdAt,
			updatedAt: contact.updatedAt,
		}
	}
}
