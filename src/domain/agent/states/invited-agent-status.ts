import { Injectable } from '@nestjs/common'
import { AgentStatus } from '@/domain/agent/contracts/agent-status.contract'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { Active } from './active-agent-status'
import { Inactive } from './inactive-agent-status'

@Injectable()
export class Invited implements AgentStatus {
	getName(): string {
		return 'Invited'
	}

	async inactiveAgent(agent: Agent): Promise<void> {
		agent.status = new Inactive()
	}

	async inviteAgent(agent: Agent): Promise<void> {
		agent.status = new Invited()
	}

	async activeAgent(agent: Agent): Promise<void> {
		agent.status = new Active()
	}
}
