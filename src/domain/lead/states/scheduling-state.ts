import { DomainError } from '@/core/errors/errors/domain.error'
import { ScheduledState } from '@/domain/scheduling/states/scheduled-scheduling-status'
import { Lead } from '../entities/lead.entity'
import { LeadState } from './lead-state.interface'
import { ServiceState } from './service-state'
import { VisitState } from './visit-state'

export class SchedulingState extends LeadState {
	needToChangeAgent(lead: Lead): boolean {
		if (!lead.updatedAt) return false
		const dias = 7
		const hora = 24 * dias

		const now = new Date()
		const diffInMs = now.getTime() - lead.updatedAt.getTime()

		return diffInMs >= hora * 60 * 60 * 1000
	}

	get name(): string {
		return 'Scheduling'
	}
	changeStatus(lead: Lead, newStatus: LeadState): LeadState {
		if (newStatus instanceof ServiceState) {
			return newStatus
		}

		if (newStatus instanceof VisitState) {
			const schedulings = lead.schedulings.getItems()
			const hasSchedulings = schedulings.some(
				(scheduling) => scheduling.status instanceof ScheduledState,
			)

			if (hasSchedulings) {
				return newStatus
			}
		}
		throw new DomainError('The lead is still in the scheduling phase.')
	}
}
