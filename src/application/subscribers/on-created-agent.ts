import { Injectable } from '@nestjs/common'
import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { CreatedAgentEvent } from '@/domain/agent/events/created-agent.event'
import { TokenFacade } from '../facades/token/token.facade'

@Injectable()
export class OnCreatedAgent implements EventHandler {
	constructor(private tokenFacade: TokenFacade) {
		this.setupSubscriptions()
	}
	setupSubscriptions(): void {
		DomainEvents.register(this.handle.bind(this), CreatedAgentEvent.name)
	}

	private async handle({ agent }: CreatedAgentEvent) {
		console.log('evento de agente criado', agent)
		await this.tokenFacade.create({ agent, type: 'Invite' })
	}
}
