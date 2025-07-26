import { Injectable } from '@nestjs/common'
import { GetIAMessageStrategy } from '@/application/facades/ia-message/contract/get-ia-messages.strategy'
import { GetIAMessageStrategyNotFoundError } from '../errors/get-ia-message-strategy-not-found.error'
import {
	FindIAMessageByIdUseCase,
	FindIAMessageByIdUseCaseRequest,
} from '../find-ia-message-by-id.use-case'

export interface GetIAMessageStrategyFactoryTypeMap {
	id: FindIAMessageByIdUseCaseRequest
}

@Injectable()
export class GetIAMessageStrategyFactory {
	constructor(private findIAMessageByIdUseCase: FindIAMessageByIdUseCase) {}

	async getStrategy<T extends keyof GetIAMessageStrategyFactoryTypeMap>({
		type,
	}: {
		type: T
	}): Promise<GetIAMessageStrategy<GetIAMessageStrategyFactoryTypeMap[T]>> {
		if (type === 'id') {
			return this.findIAMessageByIdUseCase as GetIAMessageStrategy<
				GetIAMessageStrategyFactoryTypeMap[T]
			>
		}

		throw new GetIAMessageStrategyNotFoundError()
	}
}
