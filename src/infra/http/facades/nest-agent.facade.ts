/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import { Injectable } from '@nestjs/common'
import { AgentFacade, ValidateAgentInput } from '@/application/facades/agent/agent.facade'

import { AgentCreate, AgentUpdate } from '@/application/facades/agent/interface'
import { CheckIfThereNoAgentWithThisEmailUseCase } from '@/application/use-cases/agent/check-if-there-no-agent-with-this-email.use-case'
import { CreateAgentUseCase } from '@/application/use-cases/agent/create-agent.use-case'
import {
	AgentStrategyTypeMap,
	GetAgentStrategyFactory,
} from '@/application/use-cases/agent/factories/get-agent-strategy.factory'
import {
	GetManyAgentsStrategyFactory,
	GetManyAgentsStrategyTypeMap,
} from '@/application/use-cases/agent/factories/get-many-agents-strategy.factory'
import { GetValidateAgentStrategyFactory } from '@/application/use-cases/agent/factories/get-validate-agent-strategy.factory'
import { UpdateAgentUseCase } from '@/application/use-cases/agent/update-agent.use-case'
import { Agent } from '@/domain/agent/entities/agent.entity'

@Injectable()
export class NestAgentFacade implements AgentFacade {
	constructor(
		private checkIfThereNoAgentWithThisEmailUseCase: CheckIfThereNoAgentWithThisEmailUseCase,
		private createAgentUseCase: CreateAgentUseCase,
		private updateAgentUseCase: UpdateAgentUseCase,
		private getManyAgentsStrategyFactory: GetManyAgentsStrategyFactory,
		private getAgentStrategyFactory: GetAgentStrategyFactory,
		private getValidateAgentStrategyFactory: GetValidateAgentStrategyFactory,
	) {}
	async getMany<T extends keyof GetManyAgentsStrategyTypeMap>(
		type: T,
		data: GetManyAgentsStrategyTypeMap[T],
	): Promise<{ agents: Agent[] }> {
		const strategy = await this.getManyAgentsStrategyFactory.getStrategy({ type })
		return await strategy.execute(data)
	}

	async update<T extends keyof AgentStrategyTypeMap>(
		type: T,
		data: AgentStrategyTypeMap[T],
		params: AgentUpdate,
	): Promise<{ agent: Agent }> {
		const strategy = await this.getAgentStrategyFactory.getStrategy({ type })
		const { agent } = await strategy.execute(data)
		const { agent: updatedAgent } = await this.updateAgentUseCase.execute({
			agent,
			...params,
		})
		return { agent: updatedAgent }
	}
	async validate<T extends keyof AgentStrategyTypeMap, D extends AgentStrategyTypeMap[T]>(
		type: T,
		data: D,
		validations: ValidateAgentInput[],
	): Promise<{ agent: Agent }> {
		// Primeiro obtemos o agente
		const { agent } = await this.getAgent(type, data)

		// Para cada validação, obtemos a estratégia e executamos
		for (const validation of validations) {
			const strategy = await this.getValidateAgentStrategyFactory.getStrategy({
				type: validation.type,
			})

			// Montamos os parâmetros incluindo o agent obtido
			const params = {
				agent,
				...('config' in validation ? validation.config : {}),
			}

			await strategy.execute(params as any)
		}

		return { agent }
	}

	async getAgent<T extends keyof AgentStrategyTypeMap>(
		type: T,
		data: AgentStrategyTypeMap[T],
	): Promise<{ agent: Agent }> {
		const strategy = await this.getAgentStrategyFactory.getStrategy({ type })
		return await strategy.execute(data)
	}

	async create(params: AgentCreate): Promise<{ agent: Agent }> {
		await this.checkIfThereNoAgentWithThisEmailUseCase.execute({ email: params.email })
		return await this.createAgentUseCase.execute(params)
	}
}
