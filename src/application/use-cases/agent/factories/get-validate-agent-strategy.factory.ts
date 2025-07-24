// factories/get-validate-agent-strategy.factory.ts
import { Injectable } from '@nestjs/common'
import { AgentValidateStrategy } from '@/application/facades/agent/contract/agent-validate-strategy'
import {
	CheckAgentIsActiveUseCase,
	CheckAgentIsActiveUseCaseRequest,
} from '../check-agent-is-active.use-case'
import {
	CheckAgentPasswordUseCase,
	CheckAgentPasswordUseCaseRequest,
} from '../check-agent-password.use-case'
import {
	CheckIfAgentHasPermissionsUseCase,
	CheckIfAgentHasPermissionsUseCaseRequest,
} from '../check-if-agent-has-permissions.use-case'
import {
	CheckIfThereNoAgentWithThisEmailUseCase,
	CheckIfThereNoAgentWithThisEmailUseCaseRequest,
} from '../check-if-there-no-agent-with-this-email.use-case'
import { GetValidateStrategyNotFoundError } from '../errors/get-validate-strategy-not-found.error'

export interface ValidateAgentStrategyMap {
	permissions: CheckIfAgentHasPermissionsUseCaseRequest
	active: CheckAgentIsActiveUseCaseRequest
	email: CheckIfThereNoAgentWithThisEmailUseCaseRequest
	password: CheckAgentPasswordUseCaseRequest
}

@Injectable()
export class GetValidateAgentStrategyFactory {
	constructor(
		private checkIfAgentHasPermissionsUseCase: CheckIfAgentHasPermissionsUseCase,
		private checkIfThereNoAgentWithThisEmailUseCase: CheckIfThereNoAgentWithThisEmailUseCase,
		private checkAgentIsActiveUseCase: CheckAgentIsActiveUseCase,
		private checkAgentPasswordUseCase: CheckAgentPasswordUseCase,
	) {}

	async getStrategy<T extends keyof ValidateAgentStrategyMap>({
		type,
	}: {
		type: T
	}): Promise<AgentValidateStrategy<ValidateAgentStrategyMap[T]>> {
		if (type === 'permissions') {
			return this.checkIfAgentHasPermissionsUseCase as AgentValidateStrategy<
				ValidateAgentStrategyMap[T]
			>
		}

		if (type === 'email') {
			return this.checkIfThereNoAgentWithThisEmailUseCase as AgentValidateStrategy<
				ValidateAgentStrategyMap[T]
			>
		}

		if (type === 'active') {
			return this.checkAgentIsActiveUseCase as AgentValidateStrategy<
				ValidateAgentStrategyMap[T]
			>
		}

		if (type === 'password') {
			return this.checkAgentPasswordUseCase as AgentValidateStrategy<
				ValidateAgentStrategyMap[T]
			>
		}

		throw new GetValidateStrategyNotFoundError()
	}
}
