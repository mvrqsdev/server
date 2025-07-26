import { Injectable } from '@nestjs/common'
import { ContactCreate } from '@/application/facades/contact/interface'
import { ContactRepository } from '@/application/repositories/contact.repository'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { WhatsappNumber } from '@/core/value-objects/whatsapp-number.value-object'
import { Contact } from '@/domain/contact/entities/contact.entity'

export interface CreateContactUseCaseResponse {
	contact: Contact
}

@Injectable()
export class CreateContactUseCase
	implements BaseUseCase<ContactCreate, CreateContactUseCaseResponse>
{
	constructor(private contactRepository: ContactRepository) {}
	async execute({
		name,
		number,
		email,
	}: ContactCreate): Promise<CreateContactUseCaseResponse> {
		const contact = Contact.create({
			name,
			number: WhatsappNumber.create(number),
			email,
		})

		await this.contactRepository.create(contact)

		return {
			contact,
		}
	}
}
