import { Agent } from '@/domain/agent/entities/agent.entity'

export abstract class FindAgent {
	abstract find(criteria): Promise<Agent | null>
}
