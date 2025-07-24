import { Injectable } from '@nestjs/common'
import { GetManyAgentsStrategy } from '@/application/facades/agent/contract/get-many-agents-strategy'
import { AgentRepository } from '@/application/repositories/agent.repository'
import { Agent } from '@/domain/agent/entities/agent.entity'

export interface GetManyAgentsByFilterUseCaseRequest {
	agentIds?: string[]
	name?: string
	email?: string
	master?: boolean
	roles?: string[]
	inRotation?: boolean
	status?: string[]
	start_created_at?: Date
	end_created_at?: Date
	field?:
		| 'id'
		| 'name'
		| 'email'
		| 'master'
		| 'isInRotation'
		| 'status'
		| 'createdAt'
		| 'updatedAt'
	direction?: 'asc' | 'desc'
	page?: number
	limit?: number
}

@Injectable()
export class GetManyAgentsByFilterUseCase
	implements GetManyAgentsStrategy<GetManyAgentsByFilterUseCaseRequest>
{
	constructor(private agentRepository: AgentRepository) {}
	async execute(
		params: GetManyAgentsByFilterUseCaseRequest,
	): Promise<{ agents: Agent[] }> {
		const agents = await this.agentRepository.findManyByFilters(params)
		return {
			agents,
		}
	}
}
