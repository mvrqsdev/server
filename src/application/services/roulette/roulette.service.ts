import { Injectable } from '@nestjs/common'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { Lead } from '@/domain/lead/entities/lead.entity'
import { NoAgentInRouletteError } from './errors/no-agent-in-roulette.error'

export interface GetNextAgentRequest {
	agentsInRotation: Agent[]
	lastLead: Lead | null
	adminAgents: Agent[]
}

@Injectable()
export class RouletteService {
	getNextAgent({ agentsInRotation, lastLead, adminAgents }: GetNextAgentRequest): Agent {
		if (agentsInRotation.length > 0) {
			if (!lastLead) {
				return agentsInRotation[0]
			}

			const lastIndex = agentsInRotation.findIndex(
				(agent) => agent.id.toString() === lastLead.agentId.toString(),
			)

			const nextIndex = (lastIndex + 1) % agentsInRotation.length
			return agentsInRotation[nextIndex]
		}

		if (adminAgents.length > 0) {
			return adminAgents[0]
		}

		throw new NoAgentInRouletteError()
	}
}
