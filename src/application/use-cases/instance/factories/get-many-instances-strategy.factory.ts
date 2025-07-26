import { Injectable } from '@nestjs/common'
import { GetManyInstancesStrategy } from '@/application/facades/instance/contract/get-many-instances-strategy'
import { ManyInstancesFilter } from '@/application/facades/instance/interface'
import { GetManyInstancesStrategyNotFoundError } from '../errors/get-many-instances-strategy-not-found.error'
import { FindManyInstancesByFiltersUseCase } from '../find-many-instances-by-filters.use-case'

export interface GetManyInstancesStrategyFactoryTypeMap {
	filter: ManyInstancesFilter
}

@Injectable()
export class GetManyInstanceStrategyFactory {
	constructor(
		private findManyInstancesByFiltersUseCase: FindManyInstancesByFiltersUseCase,
	) {}

	async getStrategy<T extends keyof GetManyInstancesStrategyFactoryTypeMap>({
		type,
	}: {
		type: T
	}): Promise<GetManyInstancesStrategy<GetManyInstancesStrategyFactoryTypeMap[T]>> {
		if (type === 'filter') {
			return this.findManyInstancesByFiltersUseCase as GetManyInstancesStrategy<
				GetManyInstancesStrategyFactoryTypeMap[T]
			>
		}

		throw new GetManyInstancesStrategyNotFoundError()
	}
}
