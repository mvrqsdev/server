import { Injectable } from '@nestjs/common'
import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { CreatedTokenEvent } from '@/domain/token/events/created-token.event'
import { TokenFacade } from '../facades/token/token.facade'

@Injectable()
export class OnCreatedToken implements EventHandler {
	constructor(private tokenFacade: TokenFacade) {
		this.setupSubscriptions()
	}
	setupSubscriptions(): void {
		DomainEvents.register(this.handle.bind(this), CreatedTokenEvent.name)
	}

	private async handle({ token }: CreatedTokenEvent) {
		console.log('Evento de Token Criado', token)
	}
}
