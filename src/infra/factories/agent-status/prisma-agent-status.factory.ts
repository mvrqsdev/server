import { Inject, Injectable } from '@nestjs/common'
import { AgentStatusFactory } from '@/application/repositories/agent/factories/agent-status.factory'
import { AgentStateNotFoundError } from '@/application/repositories/agent/factories/errors/agent-state-not-found.error'
import { AgentStatus } from '@/domain/agent/contracts/agent-status.contract'

@Injectable()
export class PrismaAgentStatusFactory implements AgentStatusFactory {
	constructor(
		@Inject('AgentStatusActive')
		private readonly activeState: AgentStatus,

		@Inject('AgentStatusInactive')
		private readonly inactiveState: AgentStatus,

		@Inject('AgentStatusInvited')
		private readonly invitedState: AgentStatus,
	) {}

	create(state: 'Active' | 'Inactive' | 'Invited'): AgentStatus {
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
