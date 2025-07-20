import { Injectable } from '@nestjs/common'
import { TokenFacade } from '@/application/facades/token/token.facade'
import { AgentStatus } from '@/domain/agent/contracts/agent-status.contract'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { ActiveAgentStatusError } from './errors/active-agent-status.error'
import { InviteAgentStatusError } from './errors/invite-agent-status.error'
import { Inactive } from './inactive-agent-status'
import { Invited } from './invited-agent-status'

@Injectable()
export class Active implements AgentStatus {
	constructor(private tokenFacade: TokenFacade) {}
	getName(): string {
		return 'Active'
	}
	get name(): string {
		return this.constructor.name
	}
	async inactiveAgent(agent: Agent): Promise<void> {
		const inactiveState = new Inactive(this.tokenFacade)
		agent.status = inactiveState
	}

	async inviteAgent(agent: Agent): Promise<void> {
		const { tokens } = await this.tokenFacade.getActiveInviteTokensByAgentId()
		if (tokens.length < 3) {
			const invitedState = new Invited(this.tokenFacade)
			agent.status = invitedState
			return
		}
		throw new InviteAgentStatusError()
	}

	async activeAgent(agent: Agent): Promise<void> {
		throw new ActiveAgentStatusError()
	}
}
