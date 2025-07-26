import { Contact } from '@/domain/contact/entities/contact.entity'

export abstract class GetContactStrategy<TData> {
	abstract execute(params: TData): Promise<{ contact: Contact | null }>
}
