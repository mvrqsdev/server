import { Injectable } from '@nestjs/common'
import { ContactUpdate } from '@/application/facades/contact/interface'
import { ContactRepository } from '@/application/repositories/contact.repository'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { WhatsappNumber } from '@/core/value-objects/whatsapp-number.value-object'
import { Contact } from '@/domain/contact/entities/contact.entity'

export type UpdateContactUseCaseRequest = ContactUpdate & { contact: Contact }
export interface UpdateContactUseCaseResponse {
	contact: Contact
}

@Injectable()
export class UpdateContactUseCase
	implements BaseUseCase<UpdateContactUseCaseRequest, UpdateContactUseCaseResponse>
{
	constructor(private contactRepository: ContactRepository) {}
	async execute({
		contact,
		name,
		email,
		number,
	}: UpdateContactUseCaseRequest): Promise<UpdateContactUseCaseResponse> {
		if (typeof name !== 'undefined') {
			contact.name = name
		}

		if (typeof email !== 'undefined') {
			contact.email = email
		}

		if (typeof number !== 'undefined') {
			contact.number = WhatsappNumber.create(number)
		}

		await this.contactRepository.save(contact)

		return {
			contact,
		}
	}
}
