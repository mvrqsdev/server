import { Injectable } from '@nestjs/common'
import { TokenFacade } from '@/application/facades/token/token.facade'
import { AgentStatus } from '@/domain/agent/contracts/agent-status.contract'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { ActiveAgentStatusError } from './errors/active-agent-status.error'
import { InactiveAgentStatusError } from './errors/inactive-agent-status.error'
import { InviteAgentStatusError } from './errors/invite-agent-status.error'
import { Invited } from './invited-agent-status'

@Injectable()
export class Inactive implements AgentStatus {
	constructor(private tokenFacade: TokenFacade) {}
	getName(): string {
		return 'Inactive'
	}

	async inactiveAgent(agent: Agent): Promise<void> {
		throw new InactiveAgentStatusError()
	}

	async inviteAgent(agent: Agent): Promise<void> {
		const { tokens } = await this.tokenFacade.getActiveInviteTokensByAgentId()
		if (tokens.length < 3) {
			const invitedState = new Invited(this.tokenFacade)
			agent.status = invitedState
		}

		throw new InviteAgentStatusError()
	}

	async activeAgent(agent: Agent): Promise<void> {
		throw new ActiveAgentStatusError()
	}
}
