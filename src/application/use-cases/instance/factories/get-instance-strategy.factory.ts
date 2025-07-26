import { Injectable } from '@nestjs/common'
import { GetInstanceStrategy } from '@/application/facades/instance/contract/get-instance-strategy'
import { GetInstanceStrategyNotFoundError } from '../errors/get-instance-strategy-not-found.error'
import {
	FindInstanceByIdUseCase,
	FindInstanceByIdUseCaseRequest,
} from '../find-instance-by-id.use-case'

export interface GetInstanceStrategyFactoryTypeMap {
	id: FindInstanceByIdUseCaseRequest
}

@Injectable()
export class GetInstanceStrategyFactory {
	constructor(private findInstanceByIdUseCase: FindInstanceByIdUseCase) {}

	async getStrategy<T extends keyof GetInstanceStrategyFactoryTypeMap>({
		type,
	}: {
		type: T
	}): Promise<GetInstanceStrategy<GetInstanceStrategyFactoryTypeMap[T]>> {
		if (type === 'id') {
			return this.findInstanceByIdUseCase as GetInstanceStrategy<
				GetInstanceStrategyFactoryTypeMap[T]
			>
		}

		throw new GetInstanceStrategyNotFoundError()
	}
}
