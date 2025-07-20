import { WatchedList } from '@/core/entities/watched-list'
import { Agent } from '@/domain/agent/entities/agent.entity'

export class RoleAgents extends WatchedList<Agent> {
	compareItems(a: Agent, b: Agent): boolean {
		return a.id.equals(b.id)
	}
}
