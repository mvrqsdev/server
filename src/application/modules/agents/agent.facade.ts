import { Agent } from '@/domain/agent/entities/agent.entity'
import { CreateAgentDTO } from './dtos/create-agent.dto'

export class AgentFacade {
	async create(params: CreateAgentDTO): Promise<void> {}
	async find(criteria: Partial<Agent>) {}
}
