import { Injectable } from '@nestjs/common'
import { Agent } from '../../enterprise/entities/agent.entity'
import { Lead } from '../../enterprise/entities/lead.entity'
@Injectable()
export class RouleteService {
	getNextAgent({
		agentsInRotation,
		lastLead,
		adminAgents,
	}: {
		agentsInRotation: Agent[]
		lastLead: Lead | null
		adminAgents: Agent[]
	}): Agent {
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
			// fallback: primeiro admin encontrado
			return adminAgents[0]
		}

		throw new Error('Nenhum agente disponível para atribuição de lead')
	}
}
