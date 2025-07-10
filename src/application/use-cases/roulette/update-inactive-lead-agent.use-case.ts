import { Injectable } from '@nestjs/common'
import { AgentRepository } from '@/application/repositories/agents/agent.repository'
import { LeadRepository } from '@/application/repositories/leads/lead.repository'
import { NoAgentInRouletteError } from '@/application/services/roulette/errors/no-agent-in-roulette.error'
import { RouletteService } from '@/application/services/roulette/roulette.service'
import { Either, left, right } from '@/core/either'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { LeadNotFoundError } from '../leads/errors/lead-not-found.error'

type UpdateInactiveLeadAgentUseCaseResponse = Either<
	LeadNotFoundError | NoAgentInRouletteError,
	null
>

@Injectable()
export class UpdateInactiveLeadAgentUseCase {
	constructor(
		private leadRepository: LeadRepository,
		private agentRepository: AgentRepository,
		private rouletteService: RouletteService,
	) {}

	async execute(): Promise<UpdateInactiveLeadAgentUseCaseResponse> {
		const leads = await this.leadRepository.findCurrentLeads()
		const agentsInRotation = await this.agentRepository.findAgentsInRotation()
		const admins = await this.agentRepository.findAdmins()
		const lastLead = await this.leadRepository.findLastLeadFromAgents(agentsInRotation)
		let nextAgent: Agent
		try {
			nextAgent = this.rouletteService.getNextAgent({
				agentsInRotation,
				lastLead,
				adminAgents: admins,
			})
		} catch (error) {
			if (error instanceof NoAgentInRouletteError) {
				return left(error)
			}
			throw error
		}

		for (const lead of leads) {
			if (lead.verifyLeadToNewAgent()) {
				lead.agentId = nextAgent.id
				await this.leadRepository.save(lead)
			}
		}

		return right(null)
	}
}
