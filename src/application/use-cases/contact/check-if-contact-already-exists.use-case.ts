import { Injectable } from '@nestjs/common'
import { ContactValidateStrategy } from '@/application/facades/contact/contract/contact-validate-strategy'
import { ContactRepository } from '@/application/repositories/contact.repository'

export interface CheckIfContactAlreadyExistsByNumberUseCaseRequest {
	number: string
}

@Injectable()
export class CheckIfContactAlreadyExistsByNumberUseCase
	implements ContactValidateStrategy<CheckIfContactAlreadyExistsByNumberUseCaseRequest>
{
	constructor(private contactRepository: ContactRepository) {}
	async execute({
		number,
	}: CheckIfContactAlreadyExistsByNumberUseCaseRequest): Promise<boolean> {
		const contactWithSameNumber = await this.contactRepository.findByNumber(number)
		return !!contactWithSameNumber
	}
}
