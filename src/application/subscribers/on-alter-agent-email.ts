import { Injectable } from '@nestjs/common'
import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { AlterAgentEmailEvent } from '@/domain/agent/events/alter-agent-email.event'
import { TokenFacade } from '../facades/token/token.facade'

@Injectable()
export class OnAlterAgentEmail implements EventHandler {
	constructor(private tokenFacade: TokenFacade) {
		this.setupSubscriptions()
	}
	setupSubscriptions(): void {
		DomainEvents.register(this.handle.bind(this), AlterAgentEmailEvent.name)
	}

	private async handle({ agent }: AlterAgentEmailEvent) {
		console.log('evento de agente atualizado', agent)
		if (agent.status.getName() === 'Invited') {
			await this.tokenFacade.create({ agent, type: 'Invite' })
		}
	}
}
