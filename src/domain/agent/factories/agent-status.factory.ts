import { Inject, Injectable } from '@nestjs/common'
import { AgentStatus } from '@/domain/agent/contracts/agent-status.contract'
import { AgentStateNotFoundError } from './errors/agent-state-not-found.error'

export type AgentStateType = 'Active' | 'Inactive' | 'Invited'

@Injectable()
export class AgentStatusFactory {
	constructor(
		@Inject('AgentStatusActive')
		private readonly activeState: AgentStatus,

		@Inject('AgentStatusInactive')
		private readonly inactiveState: AgentStatus,

		@Inject('AgentStatusInvited')
		private readonly invitedState: AgentStatus,
	) {}

	create(state: string): AgentStatus {
		switch (state) {
			case 'Active':
				return this.activeState
			case 'Inactive':
				return this.inactiveState
			case 'Invited':
				return this.invitedState
			default:
				throw new AgentStateNotFoundError()
		}
	}
}
