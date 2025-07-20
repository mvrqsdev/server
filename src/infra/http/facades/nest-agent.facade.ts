import { Injectable } from '@nestjs/common'
import { AgentFacade } from '@/application/facades/agent/agent.facade'
import { AgentValidateStrategy } from '@/application/facades/agent/contract/agent-validate-strategy'
import { GetAgentStrategy } from '@/application/facades/agent/contract/get-agent-strategy'
import { GetManyAgentsStrategy } from '@/application/facades/agent/contract/get-many-agents-strategy'
import { AgentCreate, AgentUpdate } from '@/application/facades/agent/interface'
import { CheckAgentIsActiveUseCase } from '@/application/use-cases/agent/check-agent-is-active.use-case'
import { CheckIfThereNoAgentWithThisEmailUseCase } from '@/application/use-cases/agent/check-if-there-no-agent-with-this-email.use-case'
import { CreateAgentUseCase } from '@/application/use-cases/agent/create-agent.use-case'
import { UpdateAgentUseCase } from '@/application/use-cases/agent/update-agent.use-case'
import { Agent } from '@/domain/agent/entities/agent.entity'

@Injectable()
export class NestAgentFacade implements AgentFacade {
	constructor(
		private checkAgentIsActiveUseCase: CheckAgentIsActiveUseCase,
		private checkIfThereNoAgentWithThisEmailUseCase: CheckIfThereNoAgentWithThisEmailUseCase,
		private createAgentUseCase: CreateAgentUseCase,
		private updateAgentUseCase: UpdateAgentUseCase,
	) {}

	async create(params: AgentCreate): Promise<{ agent: Agent }> {
		await this.checkIfThereNoAgentWithThisEmailUseCase.execute({ email: params.email })
		const { agent } = await this.createAgentUseCase.execute(params)
		return { agent }
	}

	async update(params: AgentUpdate): Promise<{ agent: Agent }> {
		const { agent } = await this.updateAgentUseCase.execute(params)
		return { agent }
	}

	async validate<TData>(
		strategy: AgentValidateStrategy<TData>,
		data: TData,
	): Promise<{ agent: Agent }> {
		const { agent } = await strategy.validate(data)
		await this.checkAgentIsActiveUseCase.execute({ agent })
		return { agent }
	}

	async getAgent<TData, TResponse>(
		strategy: GetAgentStrategy<TData, TResponse>,
		data: TData,
	): Promise<TResponse> {
		const response = await strategy.execute(data)
		return response
	}

	async getMany<TData, TResponse>(
		strategy: GetManyAgentsStrategy<TData, TResponse>,
		data: TData,
	): Promise<TResponse> {
		const response = await strategy.execute(data)
		return response
	}
}
