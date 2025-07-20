import { Agent } from '../entities/agent.entity'

export abstract class AgentStatus {
	abstract getName(): string
	abstract inactiveAgent(agent: Agent): Promise<void>
	abstract inviteAgent(agent: Agent): Promise<void>
	abstract activeAgent(agent: Agent): Promise<void>
}
