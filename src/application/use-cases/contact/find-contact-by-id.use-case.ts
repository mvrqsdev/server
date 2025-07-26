import { Injectable } from '@nestjs/common'
import { GetContactStrategy } from '@/application/facades/contact/contract/get-contact-strategy'
import { ContactRepository } from '@/application/repositories/contact.repository'
import { Contact } from '@/domain/contact/entities/contact.entity'
import { ContactNotFoundError } from './errors/contact-not-found.error'

export interface FindContactByIdUseCaseRequest {
	contactId: string
}

@Injectable()
export class FindContactByIdUseCase
	implements GetContactStrategy<FindContactByIdUseCaseRequest>
{
	constructor(private contactRepository: ContactRepository) {}
	async execute({
		contactId,
	}: FindContactByIdUseCaseRequest): Promise<{ contact: Contact }> {
		const contact = await this.contactRepository.findById(contactId)

		if (!contact) {
			throw new ContactNotFoundError()
		}

		return {
			contact,
		}
	}
}
