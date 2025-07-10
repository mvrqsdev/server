import { DomainError } from '@/core/errors/errors/domain.error'
import { Lead } from '../entities/lead.entity'
import { LeadState } from './lead-state.interface'
import { PreServiceState } from './pre-service-state'
import { SchedulingState } from './scheduling-state'

export class ServiceState extends LeadState {
	get name(): string {
		return 'Service'
	}
	needToChangeAgent(lead: Lead): boolean {
		if (!lead.updatedAt) return false
		const dias = 1
		const hora = 24 * dias

		const now = new Date()
		const diffInMs = now.getTime() - lead.updatedAt.getTime()

		return diffInMs >= hora * 60 * 60 * 1000
	}

	changeStatus(lead: Lead, newStatus: LeadState): LeadState {
		if (newStatus instanceof PreServiceState) {
			return newStatus
		}

		if (newStatus instanceof SchedulingState) {
			return newStatus
		}

		throw new DomainError('The Lead is still in the service status.')
	}
}
