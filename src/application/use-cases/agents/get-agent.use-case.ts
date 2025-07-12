import { Injectable } from '@nestjs/common'
import { AgentRepository } from '@/application/repositories/agents/agent.repository'
import { Either, left, right } from '@/core/either'
import { AgentDetails } from '@/domain/agent/value-objects/agent-details.value-object'
import { AgentNotFoundError } from './errors/agent-not-found.error'

export interface GetAgentByIdUseCaseRequest {
	agentId: string
}

type GetAgentByIdUseCaseResponse = Either<AgentNotFoundError, { agent: AgentDetails }>

@Injectable()
export class GetAgentByIdUseCase {
	constructor(private agentRepository: AgentRepository) {}

	async execute({
		agentId,
	}: GetAgentByIdUseCaseRequest): Promise<GetAgentByIdUseCaseResponse> {
		const agent = await this.agentRepository.findDetailsById(agentId)

		if (!agent) {
			return left(new AgentNotFoundError())
		}

		return right({
			agent,
		})
	}
}
