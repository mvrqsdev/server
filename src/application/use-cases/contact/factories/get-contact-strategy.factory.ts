import { Injectable } from '@nestjs/common'
import { GetContactStrategy } from '@/application/facades/contact/contract/get-contact-strategy'
import { GetContactStrategyNotFoundError } from '../errors/get-contact-strategy-not-found.error'
import {
	FindContactByIdUseCase,
	FindContactByIdUseCaseRequest,
} from '../find-contact-by-id.use-case'
import {
	FindContactByNumberUseCase,
	FindContactByNumberUseCaseRequest,
} from '../find-contact-by-number.use-case'

export interface GetContactStrategyFactoryTypeMap {
	id: FindContactByIdUseCaseRequest
	number: FindContactByNumberUseCaseRequest
}

@Injectable()
export class GetContactStrategyFactory {
	constructor(
		private findContactByIdUseCase: FindContactByIdUseCase,
		private findContactByNumberUseCase: FindContactByNumberUseCase,
	) {}

	async getStrategy<T extends keyof GetContactStrategyFactoryTypeMap>({
		type,
	}: {
		type: T
	}): Promise<GetContactStrategy<GetContactStrategyFactoryTypeMap[T]>> {
		if (type === 'id') {
			return this.findContactByIdUseCase as GetContactStrategy<
				GetContactStrategyFactoryTypeMap[T]
			>
		}

		if (type === 'number') {
			return this.findContactByNumberUseCase as GetContactStrategy<
				GetContactStrategyFactoryTypeMap[T]
			>
		}

		throw new GetContactStrategyNotFoundError()
	}
}
