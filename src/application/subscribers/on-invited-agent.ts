import { Injectable } from '@nestjs/common'
import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { InviteAgentEvent } from '@/domain/agent/events/invite-agent-event'
import { TokenFacade } from '../facades/token/token.facade'

@Injectable()
export class OnInvitedAgent implements EventHandler {
	constructor(private tokenFacade: TokenFacade) {
		this.setupSubscriptions()
	}
	setupSubscriptions(): void {
		DomainEvents.register(this.createInviteAndSend.bind(this), InviteAgentEvent.name)
	}

	private async createInviteAndSend({ agent }: InviteAgentEvent) {
		await this.tokenFacade.createInviteAndSend({
			agentId: agent.id.toString(),
			type: 'Invite',
		})
	}
}
