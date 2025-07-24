import { Injectable } from '@nestjs/common'
import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { AlterAgentStatusEvent } from '@/domain/agent/events/alter-agent-status.event'
import { TokenFacade } from '../facades/token/token.facade'

@Injectable()
export class OnAlterAgentStatus implements EventHandler {
	constructor(private tokenFacade: TokenFacade) {
		this.setupSubscriptions()
	}
	setupSubscriptions(): void {
		DomainEvents.register(this.handle.bind(this), AlterAgentStatusEvent.name)
	}

	private async handle({ agent }: AlterAgentStatusEvent) {
		if (agent.status.getName() === 'Invited') {
			await this.tokenFacade.create({ agent, type: 'Invite' })
		}
	}
}
