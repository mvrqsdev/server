import { Injectable } from '@nestjs/common'
import { GetAgentStrategy } from '@/application/facades/agent/contract/get-agent-strategy'
import { GetAgentStrategyNotFoundError } from '../errors/get-agent-strategy-not-found.error'
import {
	FindAgentByAuthenticationUseCase,
	FindAgentByAuthenticationUseCaseRequest,
} from '../find-agent-by-authentication.use-case'
import {
	FindAgentByEmailUseCase,
	FindAgentByEmailUseCaseRequest,
} from '../find-agent-by-email.use-case'
import {
	FindAgentByIdUseCase,
	FindAgentByIdUseCaseRequest,
} from '../find-agent-by-id.use-case'

export interface AgentStrategyTypeMap {
	authentication: FindAgentByAuthenticationUseCaseRequest
	email: FindAgentByEmailUseCaseRequest
	id: FindAgentByIdUseCaseRequest
}

@Injectable()
export class GetAgentStrategyFactory {
	constructor(
		private findAgentByAuthenticationUseCase: FindAgentByAuthenticationUseCase,
		private findAgentByEmailUseCase: FindAgentByEmailUseCase,
		private findAgentByIdUseCase: FindAgentByIdUseCase,
	) {}

	async getStrategy<T extends keyof AgentStrategyTypeMap>({
		type,
	}: {
		type: T
	}): Promise<GetAgentStrategy<AgentStrategyTypeMap[T]>> {
		if (type === 'authentication') {
			return this.findAgentByAuthenticationUseCase as GetAgentStrategy<
				AgentStrategyTypeMap[T]
			>
		}

		if (type === 'email') {
			return this.findAgentByEmailUseCase as GetAgentStrategy<AgentStrategyTypeMap[T]>
		}

		if (type === 'id') {
			return this.findAgentByIdUseCase as GetAgentStrategy<AgentStrategyTypeMap[T]>
		}

		throw new GetAgentStrategyNotFoundError()
	}
}
