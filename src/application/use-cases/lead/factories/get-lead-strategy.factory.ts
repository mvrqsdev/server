import { Injectable } from '@nestjs/common'
import { GetLeadStrategy } from '@/application/facades/lead/contract/get-lead-strategy'
import { GetLeadStrategyNotFoundError } from '../errors/get-lead-strategy-not-found.error'
import {
	FindLeadByIdUseCase,
	FindLeadByIdUseCaseRequest,
} from '../find-lead-by-id.use-case'

export interface GetLeadStrategyFactoryTypeMap {
	id: FindLeadByIdUseCaseRequest
}

@Injectable()
export class GetLeadStrategyFactory {
	constructor(private findLeadByIdUseCase: FindLeadByIdUseCase) {}
	async getStrategy<T extends keyof GetLeadStrategyFactoryTypeMap>({
		type,
	}: {
		type: T
	}): Promise<GetLeadStrategy<GetLeadStrategyFactoryTypeMap[T]>> {
		if (type === 'id') {
			return this.findLeadByIdUseCase as GetLeadStrategy<GetLeadStrategyFactoryTypeMap[T]>
		}

		throw new GetLeadStrategyNotFoundError()
	}
}
