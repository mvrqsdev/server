import { Injectable } from '@nestjs/common'
import { GetLeadStrategy } from '@/application/facades/lead/contract/get-lead-strategy'
import { GetLeadStrategyNotFoundError } from '../errors/get-lead-strategy-not-found.error'
import {
	FindLastLeadByContactIdUseCase,
	FindLastLeadByContactIdUseCaseRequest,
} from '../find-last-lead-by-contact-id.use-case'
import {
	FindLeadByIdUseCase,
	FindLeadByIdUseCaseRequest,
} from '../find-lead-by-id.use-case'

export interface GetLeadStrategyFactoryTypeMap {
	id: FindLeadByIdUseCaseRequest
	contactId: FindLastLeadByContactIdUseCaseRequest
}

@Injectable()
export class GetLeadStrategyFactory {
	constructor(
		private findLeadByIdUseCase: FindLeadByIdUseCase,
		private findLastLeadByContactIdUseCase: FindLastLeadByContactIdUseCase,
	) {}
	async getStrategy<T extends keyof GetLeadStrategyFactoryTypeMap>({
		type,
	}: {
		type: T
	}): Promise<GetLeadStrategy<GetLeadStrategyFactoryTypeMap[T]>> {
		if (type === 'id') {
			return this.findLeadByIdUseCase as GetLeadStrategy<GetLeadStrategyFactoryTypeMap[T]>
		}

		if (type === 'contactId') {
			return this.findLastLeadByContactIdUseCase as GetLeadStrategy<
				GetLeadStrategyFactoryTypeMap[T]
			>
		}

		throw new GetLeadStrategyNotFoundError()
	}
}
