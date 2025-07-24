import { Injectable } from '@nestjs/common'
import { AgentStatus } from '@/domain/agent/contracts/agent-status.contract'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { ActiveAgentStatusError } from './errors/active-agent-status.error'
import { InactiveAgentStatusError } from './errors/inactive-agent-status.error'
import { Invited } from './invited-agent-status'

@Injectable()
export class Inactive implements AgentStatus {
	getName(): string {
		return 'Inactive'
	}

	async inactiveAgent(_: Agent): Promise<void> {
		throw new InactiveAgentStatusError()
	}

	async inviteAgent(agent: Agent): Promise<void> {
		agent.status = new Invited()
	}

	async activeAgent(_: Agent): Promise<void> {
		throw new ActiveAgentStatusError()
	}
}
