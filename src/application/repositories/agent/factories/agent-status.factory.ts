import { AgentStatus } from '@/domain/agent/contracts/agent-status.contract'

export type AgentStateType = 'Active' | 'Inactive' | 'Invited'

export abstract class AgentStatusFactory {
	abstract create(state: AgentStateType): AgentStatus
}
