import type { Provider } from '@nestjs/common'
import { Active } from '@/application/repositories/agent/states/active-agent-status'
import { Inactive } from '@/application/repositories/agent/states/inactive-agent-status'
import { Invited } from '@/application/repositories/agent/states/invited-agent-status'

export const AgentStatusProviders: Provider[] = [
	{
		provide: 'AgentStatusActive',
		useClass: Active,
	},
	{
		provide: 'AgentStatusInactive',
		useClass: Inactive,
	},
	{
		provide: 'AgentStatusInvited',
		useClass: Invited,
	},
]
