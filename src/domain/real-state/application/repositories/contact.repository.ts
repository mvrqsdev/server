import { Contact } from '../../enterprise/entities/contact.entity'

export abstract class ContactRepository {
	abstract findById(id: string): Promise<Contact | null>
	abstract findByWhatsappNumber(whatsappNumber: string): Promise<Contact | null>
	abstract create(contact: Contact): Promise<void>
	abstract save(contact: Contact): Promise<void>
}
