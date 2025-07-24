import { Injectable } from '@nestjs/common'
import { AgentStatus } from '@/domain/agent/contracts/agent-status.contract'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { ActiveAgentStatusError } from './errors/active-agent-status.error'
import { Inactive } from './inactive-agent-status'
import { Invited } from './invited-agent-status'

@Injectable()
export class Active implements AgentStatus {
	getName(): string {
		return 'Active'
	}

	async inactiveAgent(agent: Agent): Promise<void> {
		agent.status = new Inactive()
	}

	async inviteAgent(agent: Agent): Promise<void> {
		agent.status = new Invited()
	}

	async activeAgent(_: Agent): Promise<void> {
		throw new ActiveAgentStatusError()
	}
}
