import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { OnAgentCreatedEvent } from '../on-agent-created.event'

@Injectable()
export class AgentCreatedListener {
	@OnEvent('agent.created')
	handleOrderCreatedEvent(event: OnAgentCreatedEvent) {
		console.log(event)
	}
}
