import { Injectable } from '@nestjs/common'
import { GetManyAgentsStrategy } from '@/application/facades/agent/contract/get-many-agents-strategy'
import { GetManyAgentsStrategyNotFoundError } from '../errors/get-many-agent-strategy-not-found.error'
import {
	GetManyAgentsByFilterUseCase,
	GetManyAgentsByFilterUseCaseRequest,
} from '../get-many-agents-by-filters.use-case'

export interface GetManyAgentsStrategyTypeMap {
	filters: GetManyAgentsByFilterUseCaseRequest
}

@Injectable()
export class GetManyAgentsStrategyFactory {
	constructor(private getManyAgentsByFilterUseCase: GetManyAgentsByFilterUseCase) {}

	async getStrategy<T extends keyof GetManyAgentsStrategyTypeMap>({
		type,
	}: {
		type: T
	}): Promise<GetManyAgentsStrategy<GetManyAgentsStrategyTypeMap[T]>> {
		if (type === 'filters') {
			return this.getManyAgentsByFilterUseCase as GetManyAgentsStrategy<
				GetManyAgentsStrategyTypeMap[T]
			>
		}

		throw new GetManyAgentsStrategyNotFoundError()
	}
}
