import { Injectable } from '@nestjs/common'
import { AgentFacade } from '@/application/facades/agent/agent.facade'
import { AgentValidateStrategy } from '@/application/facades/agent/contract/agent-validate-strategy'
import { GetAgentStrategy } from '@/application/facades/agent/contract/get-agent-strategy'
import { AgentCreate } from '@/application/facades/agent/interface'
import { Agent } from '@/domain/agent/entities/agent.entity'

@Injectable()
export class NestAgentFacade implements AgentFacade {
	constructor() {}
	async create(params: AgentCreate): Promise<{ agent: Agent }> {
		throw new Error('Method not implemented.')
	}

	async validate<TData, TResponse>(
		strategy: AgentValidateStrategy<TData, TResponse>,
		data: TData,
	): Promise<TResponse> {
		const validated = await strategy.validate(data)
		return validated
	}

	async getAgent<TData, TResponse>(
		strategy: GetAgentStrategy<TData, TResponse>,
		data: TData,
	): Promise<TResponse> {
		const response = await strategy.execute(data)
		return response
	}
}
