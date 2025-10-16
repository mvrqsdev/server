import { GetContactStrategyFactoryTypeMap } from '@/application/use-cases/contact/factories/get-contact-strategy.factory'
import { Contact } from '@/domain/contact/entities/contact.entity'
import { ContactCreate, ContactUpdate } from './interface'

export abstract class ContactFacade {
	abstract findOrCreate(params: ContactCreate): Promise<{ contact: Contact }>
	abstract update<T extends keyof GetContactStrategyFactoryTypeMap>(
		type: T,
		data: GetContactStrategyFactoryTypeMap[T],
		params: ContactUpdate,
	): Promise<{ contact: Contact | null }>
	abstract getContact<T extends keyof GetContactStrategyFactoryTypeMap>(
		type: T,
		data: GetContactStrategyFactoryTypeMap[T],
	): Promise<{ contact: Contact | null }>
}
