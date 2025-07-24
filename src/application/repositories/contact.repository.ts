import { Contact } from '@/domain/contact/entities/contact.entity'

export abstract class ContactRepository {
	abstract create(contact: Contact): Promise<void>
	abstract save(contact: Contact): Promise<void>
}
