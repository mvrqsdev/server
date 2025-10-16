import { Injectable } from '@nestjs/common'
import { ContactFacade } from '@/application/facades/contact/contact.facade'
import { ContactCreate, ContactUpdate } from '@/application/facades/contact/interface'
import { CheckIfContactAlreadyExistsByNumberUseCase } from '@/application/use-cases/contact/check-if-contact-already-exists.use-case'
import { CreateContactUseCase } from '@/application/use-cases/contact/create-contact.use-case'
import {
	GetContactStrategyFactory,
	GetContactStrategyFactoryTypeMap,
} from '@/application/use-cases/contact/factories/get-contact-strategy.factory'
import { UpdateContactUseCase } from '@/application/use-cases/contact/update-contact.use-case'
import { Contact } from '@/domain/contact/entities/contact.entity'

@Injectable()
export class NestContactFacade implements ContactFacade {
	constructor(
		private getContactStrategyFactory: GetContactStrategyFactory,
		private createContactUseCase: CreateContactUseCase,
		private updateContactUseCase: UpdateContactUseCase,
		private checkIfContactAlreadyExistsByNumberUseCase: CheckIfContactAlreadyExistsByNumberUseCase,
	) {}
	async findOrCreate(params: ContactCreate): Promise<{ contact: Contact }> {
		const alreadyExistsContact =
			await this.checkIfContactAlreadyExistsByNumberUseCase.execute({
				number: params.number,
			})
		if (!alreadyExistsContact) {
			const { contact } = await this.createContactUseCase.execute(params)
			return { contact }
		}

		const strategy = await this.getContactStrategyFactory.getStrategy({ type: 'number' })
		const { contact } = await strategy.execute({ number: params.number })
		return { contact }
	}
	async update<T extends keyof GetContactStrategyFactoryTypeMap>(
		type: T,
		data: GetContactStrategyFactoryTypeMap[T],
		params: ContactUpdate,
	): Promise<{ contact: Contact | null }> {
		const strategy = await this.getContactStrategyFactory.getStrategy({ type })
		const { contact } = await strategy.execute(data)
		const { contact: updatedContact } = await this.updateContactUseCase.execute({
			contact,
			...params,
		})

		return {
			contact: updatedContact,
		}
	}
	async getContact<T extends keyof GetContactStrategyFactoryTypeMap>(
		type: T,
		data: GetContactStrategyFactoryTypeMap[T],
	): Promise<{ contact: Contact | null }> {
		const strategy = await this.getContactStrategyFactory.getStrategy({ type })
		const { contact } = await strategy.execute(data)

		return {
			contact,
		}
	}
}
