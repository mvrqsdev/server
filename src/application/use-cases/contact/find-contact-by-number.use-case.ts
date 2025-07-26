import { Injectable } from '@nestjs/common'
import { GetContactStrategy } from '@/application/facades/contact/contract/get-contact-strategy'
import { ContactRepository } from '@/application/repositories/contact.repository'
import { Contact } from '@/domain/contact/entities/contact.entity'

export interface FindContactByNumberUseCaseRequest {
	number: string
}

@Injectable()
export class FindContactByNumberUseCase
	implements GetContactStrategy<FindContactByNumberUseCaseRequest>
{
	constructor(private contactRepository: ContactRepository) {}
	async execute({
		number,
	}: FindContactByNumberUseCaseRequest): Promise<{ contact: Contact | null }> {
		const contact = await this.contactRepository.findByNumber(number)

		return {
			contact,
		}
	}
}
