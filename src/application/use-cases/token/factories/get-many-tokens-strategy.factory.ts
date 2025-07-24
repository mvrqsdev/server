import { Injectable } from '@nestjs/common'
import { GetManyTokensStrategy } from '@/application/facades/token/contract/get-tokens-strategy'
import { GetTokensStrategyNotFoundError } from '../errors/get-tokens-strategy-not-found.error'
import {
	FindAllTokensByFiltersRequest,
	FindAllTokensByFiltersUseCase,
} from '../find-all-tokens-by-filters.use-case'

export interface GetManyTokensStrategyTypeMap {
	filters: FindAllTokensByFiltersRequest
}

@Injectable()
export class GetManyTokensStrategyFactory {
	constructor(private findAllTokensByFiltersUseCase: FindAllTokensByFiltersUseCase) {}

	async getStrategy<T extends keyof GetManyTokensStrategyTypeMap>({
		type,
	}: {
		type: T
	}): Promise<GetManyTokensStrategy<GetManyTokensStrategyTypeMap[T]>> {
		if (type === 'filters') {
			return this.findAllTokensByFiltersUseCase as GetManyTokensStrategy<
				GetManyTokensStrategyTypeMap[T]
			>
		}

		throw new GetTokensStrategyNotFoundError()
	}
}
