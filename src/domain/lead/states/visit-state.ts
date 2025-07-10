import { DomainError } from '@/core/errors/errors/domain.error'
import { Lead } from '../entities/lead.entity'
import { FolderState } from './folder-state'
import { LeadState } from './lead-state.interface'
import { SchedulingState } from './scheduling-state'

export class VisitState extends LeadState {
	get name(): string {
		return 'Visit'
	}
	needToChangeAgent(lead: Lead): boolean {
		if (!lead.updatedAt) return false
		const dias = 7
		const hora = 24 * dias

		const now = new Date()
		const diffInMs = now.getTime() - lead.updatedAt.getTime()

		return diffInMs >= hora * 60 * 60 * 1000
	}

	changeStatus(lead: Lead, newStatus: LeadState): LeadState {
		if (newStatus instanceof SchedulingState) {
			const schedulings = lead.schedulings.getItems()
			const hasNoScheduling = schedulings.length === 0
			const allAppointmentsHaveBeenVisited = schedulings.every(
				(scheduling) => scheduling.status instanceof VisitState,
			)

			if (allAppointmentsHaveBeenVisited || hasNoScheduling) {
				return newStatus
			}
		}

		if (newStatus instanceof FolderState) {
			return newStatus
		}

		throw new DomainError('The Lead is still in the visit status.')
	}
}
